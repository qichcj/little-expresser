/**
 * 小小表达家 — 语音播报模块
 * 基于 Web Speech API (speechSynthesis)
 */

const Voice = {
  _voices: [],
  _loaded: false,

  // 初始化：预加载语音列表
  init() {
    if ('speechSynthesis' in window) {
      this._voices = speechSynthesis.getVoices();
      if (this._voices.length === 0) {
        // Chrome 需要异步加载 voices
        speechSynthesis.onvoiceschanged = () => {
          this._voices = speechSynthesis.getVoices();
          this._loaded = true;
        };
      } else {
        this._loaded = true;
      }
    } else {
      console.warn('当前浏览器不支持语音播报');
    }
  },

  // 获取最佳中文语音
  _getBestVoice() {
    if (!this._voices.length) {
      this._voices = speechSynthesis.getVoices();
    }
    // 优先级：中文普通话女声 > 中文普通话 > 任何中文 > 默认
    const exact = this._voices.find(v => v.lang === 'zh-CN' && v.name.includes('Female'));
    if (exact) return exact;
    const zhCN = this._voices.find(v => v.lang === 'zh-CN');
    if (zhCN) return zhCN;
    const zhAny = this._voices.find(v => v.lang.startsWith('zh'));
    if (zhAny) return zhAny;
    return null;
  },

  /**
   * 播报文字
   * @param {string} text - 要播报的文字
   * @param {object} options - 可选参数
   * @param {number} options.rate - 语速 (0.1-10)，默认 0.85
   * @param {number} options.pitch - 音调 (0-2)，默认 1.1
   * @param {function} options.onStart - 开始播报回调
   * @param {function} options.onEnd - 结束播报回调
   */
  speak(text, options = {}) {
    if (!('speechSynthesis' in window)) {
      console.warn('当前浏览器不支持语音播报');
      return;
    }

    // 取消正在进行的播报
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang || CONFIG.SPEECH_LANG;
    utterance.rate = options.rate || CONFIG.SPEECH_RATE;
    utterance.pitch = options.pitch || CONFIG.SPEECH_PITCH;
    utterance.volume = 1;

    const voice = this._getBestVoice();
    if (voice) {
      utterance.voice = voice;
    }

    if (options.onStart) utterance.onstart = options.onStart;
    if (options.onEnd) utterance.onend = options.onEnd;

    // iOS Safari 需要先加载语音再播报
    if (!this._loaded && this._voices.length === 0) {
      this._voices = speechSynthesis.getVoices();
    }

    // 延迟一小段时间确保语音加载
    setTimeout(() => {
      speechSynthesis.speak(utterance);
    }, 50);
  },

  /**
   * 播报单个词语（适合儿童，更慢更清晰）
   */
  speakWord(text) {
    this.speak(text, { rate: 0.7, pitch: 1.2 });
  },

  /**
   * 停止播报
   */
  stop() {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  },

  /**
   * 检查是否正在播报
   */
  isSpeaking() {
    return 'speechSynthesis' in window && speechSynthesis.speaking;
  }
};
