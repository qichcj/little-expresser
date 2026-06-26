/**
 * 小小表达家 — 菜单数据定义
 * 6 大一级分类，每类 3-4 层深度
 * 每个叶子节点代表一个可表达的具体事物
 */

const DEFAULT_MENU_DATA = [
  // ==================== 一、衣 ====================
  {
    id: "clothes",
    name: "衣",
    emoji: "👔",
    color: "#FF6B6B",
    children: [
      {
        id: "clothes-home",
        name: "在家穿",
        emoji: "🏠",
        imageQuery: "home clothes casual wear child",
        children: [
          { id: "clothes-home-top", name: "上衣", emoji: "👕", imageQuery: "child t-shirt top", children: [
            { id: "clothes-home-top-tshirt", name: "T恤", emoji: "👕", imageQuery: "child t-shirt", children: [] },
            { id: "clothes-home-top-tank", name: "背心", emoji: "🎽", imageQuery: "child tank top", children: [] },
            { id: "clothes-home-top-long", name: "长袖", emoji: "👚", imageQuery: "child long sleeve shirt", children: [] }
          ]},
          { id: "clothes-home-bottom", name: "裤子", emoji: "👖", imageQuery: "child pants", children: [
            { id: "clothes-home-bottom-long", name: "长裤", emoji: "👖", imageQuery: "child long pants", children: [] },
            { id: "clothes-home-bottom-short", name: "短裤", emoji: "🩳", imageQuery: "child shorts", children: [] },
            { id: "clothes-home-bottom-sweat", name: "运动裤", emoji: "🏃", imageQuery: "child sweatpants", children: [] }
          ]},
          { id: "clothes-home-set", name: "家居服", emoji: "🧘", imageQuery: "child pajamas home clothes", children: [
            { id: "clothes-home-set-dress", name: "家居裙", emoji: "👗", imageQuery: "child house dress", children: [] },
            { id: "clothes-home-set-suit", name: "家居套装", emoji: "✨", imageQuery: "child home suit", children: [] }
          ]},
          { id: "clothes-home-socks", name: "袜子", emoji: "🧦", imageQuery: "child socks", children: [
            { id: "clothes-home-socks-short", name: "短袜", emoji: "🧦", imageQuery: "short socks child", children: [] },
            { id: "clothes-home-socks-long", name: "长袜", emoji: "🧦", imageQuery: "long socks child", children: [] }
          ]}
        ]
      },
      {
        id: "clothes-outdoor",
        name: "外出穿",
        emoji: "🌤️",
        imageQuery: "child outdoor clothing",
        children: [
          { id: "clothes-outdoor-head", name: "头上戴的", emoji: "🤠", imageQuery: "child hat headwear", children: [
            { id: "clothes-outdoor-head-hat", name: "帽子", emoji: "🧢", imageQuery: "child cap hat", children: [] },
            { id: "clothes-outdoor-head-scarf", name: "围巾", emoji: "🧣", imageQuery: "child scarf", children: [] },
            { id: "clothes-outdoor-head-mask", name: "口罩", emoji: "😷", imageQuery: "child face mask", children: [] },
            { id: "clothes-outdoor-head-sunglass", name: "太阳镜", emoji: "🕶️", imageQuery: "child sunglasses", children: [] }
          ]},
          { id: "clothes-outdoor-upper", name: "上身穿的", emoji: "👔", imageQuery: "child jacket coat", children: [
            { id: "clothes-outdoor-upper-jacket", name: "外套", emoji: "🧥", imageQuery: "child jacket coat", children: [] },
            { id: "clothes-outdoor-upper-sweater", name: "毛衣", emoji: "🧶", imageQuery: "child sweater knit", children: [] },
            { id: "clothes-outdoor-upper-shirt", name: "衬衫", emoji: "👔", imageQuery: "child shirt formal", children: [] },
            { id: "clothes-outdoor-upper-hoodie", name: "卫衣", emoji: "🏃", imageQuery: "child hoodie sweatshirt", children: [] },
            { id: "clothes-outdoor-upper-down", name: "羽绒服", emoji: "🪶", imageQuery: "child down jacket puffer", children: [] }
          ]},
          { id: "clothes-outdoor-lower", name: "下身穿的", emoji: "👖", imageQuery: "child pants jeans", children: [
            { id: "clothes-outdoor-lower-jeans", name: "牛仔裤", emoji: "👖", imageQuery: "child jeans denim", children: [] },
            { id: "clothes-outdoor-lower-cotton", name: "棉裤", emoji: "👖", imageQuery: "child cotton pants", children: [] },
            { id: "clothes-outdoor-lower-skirt", name: "裙子", emoji: "👗", imageQuery: "child skirt dress", children: [] },
            { id: "clothes-outdoor-lower-shorts", name: "短裤", emoji: "🩳", imageQuery: "child shorts summer", children: [] }
          ]},
          { id: "clothes-outdoor-shoes", name: "脚上穿的", emoji: "👟", imageQuery: "child shoes footwear", children: [
            { id: "clothes-outdoor-shoes-sneaker", name: "运动鞋", emoji: "👟", imageQuery: "child sneakers athletic shoes", children: [] },
            { id: "clothes-outdoor-shoes-boot", name: "靴子", emoji: "👢", imageQuery: "child boots", children: [] },
            { id: "clothes-outdoor-shoes-sandal", name: "凉鞋", emoji: "👡", imageQuery: "child sandals", children: [] },
            { id: "clothes-outdoor-shoes-slipper", name: "拖鞋", emoji: "🩴", imageQuery: "child slippers", children: [] }
          ]},
          { id: "clothes-outdoor-accessory", name: "配饰", emoji: "🧤", imageQuery: "child accessories", children: [
            { id: "clothes-outdoor-accessory-gloves", name: "手套", emoji: "🧤", imageQuery: "child gloves mittens", children: [] },
            { id: "clothes-outdoor-accessory-bag", name: "书包", emoji: "🎒", imageQuery: "child backpack bag", children: [] },
            { id: "clothes-outdoor-accessory-belt", name: "腰带", emoji: "🪢", imageQuery: "child belt", children: [] }
          ]}
        ]
      },
      {
        id: "clothes-sleep",
        name: "睡觉穿",
        emoji: "🌙",
        imageQuery: "child sleepwear pajamas",
        children: [
          { id: "clothes-sleep-top", name: "睡衣", emoji: "👘", imageQuery: "child pajama top", children: [] },
          { id: "clothes-sleep-bottom", name: "睡裤", emoji: "🩳", imageQuery: "child pajama pants", children: [] },
          { id: "clothes-sleep-onesie", name: "连体睡衣", emoji: "🧸", imageQuery: "child onesie pajamas", children: [] },
          { id: "clothes-sleep-robe", name: "睡袍", emoji: "🥋", imageQuery: "child bathrobe", children: [] }
        ]
      },
      {
        id: "clothes-weather",
        name: "按天气穿",
        emoji: "🌈",
        imageQuery: "weather clothing child",
        children: [
          { id: "clothes-weather-sunny", name: "晴天", emoji: "☀️", imageQuery: "child summer sunny outfit", children: [
            { id: "clothes-weather-sunny-hat", name: "太阳帽", emoji: "🧢", imageQuery: "child sun hat", children: [] },
            { id: "clothes-weather-sunny-tshirt", name: "短袖", emoji: "👕", imageQuery: "child short sleeve", children: [] },
            { id: "clothes-weather-sunny-sunscreen", name: "防晒衣", emoji: "🧴", imageQuery: "child sun protection clothing", children: [] }
          ]},
          { id: "clothes-weather-rain", name: "雨天", emoji: "🌧️", imageQuery: "child rain clothing", children: [
            { id: "clothes-weather-rain-coat", name: "雨衣", emoji: "🧥", imageQuery: "child raincoat", children: [] },
            { id: "clothes-weather-rain-boots", name: "雨鞋", emoji: "👢", imageQuery: "child rain boots", children: [] },
            { id: "clothes-weather-rain-umbrella", name: "雨伞", emoji: "☂️", imageQuery: "child umbrella", children: [] }
          ]},
          { id: "clothes-weather-cold", name: "冷天", emoji: "❄️", imageQuery: "child winter cold clothing", children: [
            { id: "clothes-weather-cold-jacket", name: "棉袄", emoji: "🧥", imageQuery: "child padded jacket", children: [] },
            { id: "clothes-weather-cold-down", name: "羽绒服", emoji: "🪶", imageQuery: "child down coat winter", children: [] },
            { id: "clothes-weather-cold-scarf", name: "围巾", emoji: "🧣", imageQuery: "winter scarf child", children: [] },
            { id: "clothes-weather-cold-gloves", name: "手套", emoji: "🧤", imageQuery: "child winter gloves", children: [] },
            { id: "clothes-weather-cold-hat", name: "毛线帽", emoji: "🎅", imageQuery: "child winter beanie hat", children: [] }
          ]},
          { id: "clothes-weather-hot", name: "热天", emoji: "🔥", imageQuery: "child summer hot clothing", children: [
            { id: "clothes-weather-hot-tank", name: "背心", emoji: "🎽", imageQuery: "child tank top summer", children: [] },
            { id: "clothes-weather-hot-shorts", name: "短裤", emoji: "🩳", imageQuery: "child summer shorts", children: [] },
            { id: "clothes-weather-hot-sandals", name: "凉鞋", emoji: "👡", imageQuery: "child sandals summer", children: [] },
            { id: "clothes-weather-hot-swimsuit", name: "泳衣", emoji: "🩱", imageQuery: "child swimsuit", children: [] }
          ]}
        ]
      }
    ]
  },

  // ==================== 二、食 ====================
  {
    id: "food",
    name: "食",
    emoji: "🍽️",
    color: "#FFA94D",
    children: [
      {
        id: "food-staple",
        name: "主食",
        emoji: "🍚",
        imageQuery: "food staple rice noodles",
        children: [
          { id: "food-staple-rice", name: "米饭", emoji: "🍚", imageQuery: "steamed rice bowl", children: [] },
          { id: "food-staple-noodle", name: "面条", emoji: "🍜", imageQuery: "noodles soup", children: [] },
          { id: "food-staple-bun", name: "馒头", emoji: "🥟", imageQuery: "steamed bun mantou", children: [] },
          { id: "food-staple-dumpling", name: "饺子", emoji: "🥟", imageQuery: "dumplings jiaozi", children: [] },
          { id: "food-staple-bread", name: "面包", emoji: "🍞", imageQuery: "bread toast fresh", children: [] },
          { id: "food-staple-porridge", name: "粥", emoji: "🥣", imageQuery: "porridge congee", children: [] },
          { id: "food-staple-corn", name: "玉米", emoji: "🌽", imageQuery: "corn cooked", children: [] },
          { id: "food-staple-potato", name: "红薯", emoji: "🍠", imageQuery: "sweet potato cooked", children: [] }
        ]
      },
      {
        id: "food-dish",
        name: "菜肴",
        emoji: "🥘",
        imageQuery: "cooked dishes food",
        children: [
          { id: "food-dish-meat", name: "肉类", emoji: "🍖", imageQuery: "cooked meat dish", children: [
            { id: "food-dish-meat-chicken", name: "鸡肉", emoji: "🍗", imageQuery: "cooked chicken dish", children: [] },
            { id: "food-dish-meat-pork", name: "猪肉", emoji: "🥩", imageQuery: "cooked pork dish", children: [] },
            { id: "food-dish-meat-beef", name: "牛肉", emoji: "🥩", imageQuery: "cooked beef dish", children: [] },
            { id: "food-dish-meat-fish", name: "鱼", emoji: "🐟", imageQuery: "cooked fish dish", children: [] },
            { id: "food-dish-meat-shrimp", name: "虾", emoji: "🦐", imageQuery: "cooked shrimp", children: [] }
          ]},
          { id: "food-dish-veggie", name: "蔬菜", emoji: "🥬", imageQuery: "cooked vegetables dish", children: [
            { id: "food-dish-veggie-green", name: "青菜", emoji: "🥬", imageQuery: "bok choy greens cooked", children: [] },
            { id: "food-dish-veggie-carrot", name: "胡萝卜", emoji: "🥕", imageQuery: "cooked carrots", children: [] },
            { id: "food-dish-veggie-broccoli", name: "西兰花", emoji: "🥦", imageQuery: "broccoli cooked", children: [] },
            { id: "food-dish-veggie-tomato", name: "西红柿", emoji: "🍅", imageQuery: "cooked tomato dish", children: [] },
            { id: "food-dish-veggie-spinach", name: "菠菜", emoji: "🥬", imageQuery: "cooked spinach", children: [] }
          ]},
          { id: "food-dish-egg", name: "蛋类", emoji: "🥚", imageQuery: "egg dish cooked", children: [
            { id: "food-dish-egg-boiled", name: "煮鸡蛋", emoji: "🥚", imageQuery: "boiled egg", children: [] },
            { id: "food-dish-egg-fried", name: "炒鸡蛋", emoji: "🍳", imageQuery: "scrambled eggs", children: [] },
            { id: "food-dish-egg-steamed", name: "蒸蛋羹", emoji: "🥣", imageQuery: "steamed egg custard", children: [] }
          ]},
          { id: "food-dish-soup", name: "汤", emoji: "🍲", imageQuery: "soup dish chinese", children: [
            { id: "food-dish-soup-egg", name: "蛋花汤", emoji: "🥚", imageQuery: "egg drop soup", children: [] },
            { id: "food-dish-soup-veggie", name: "蔬菜汤", emoji: "🥬", imageQuery: "vegetable soup", children: [] },
            { id: "food-dish-soup-meat", name: "肉汤", emoji: "🍖", imageQuery: "meat soup broth", children: [] }
          ]}
        ]
      },
      {
        id: "food-fruit",
        name: "水果",
        emoji: "🍎",
        imageQuery: "fresh fruit",
        children: [
          { id: "food-fruit-apple", name: "苹果", emoji: "🍎", imageQuery: "apple fruit fresh", children: [] },
          { id: "food-fruit-banana", name: "香蕉", emoji: "🍌", imageQuery: "banana fruit fresh", children: [] },
          { id: "food-fruit-orange", name: "橘子", emoji: "🍊", imageQuery: "orange fruit fresh", children: [] },
          { id: "food-fruit-grape", name: "葡萄", emoji: "🍇", imageQuery: "grapes fruit fresh", children: [] },
          { id: "food-fruit-strawberry", name: "草莓", emoji: "🍓", imageQuery: "strawberry fruit fresh", children: [] },
          { id: "food-fruit-watermelon", name: "西瓜", emoji: "🍉", imageQuery: "watermelon fruit fresh", children: [] },
          { id: "food-fruit-pear", name: "梨", emoji: "🍐", imageQuery: "pear fruit fresh", children: [] },
          { id: "food-fruit-peach", name: "桃子", emoji: "🍑", imageQuery: "peach fruit fresh", children: [] }
        ]
      },
      {
        id: "food-drink",
        name: "饮品",
        emoji: "🥤",
        imageQuery: "drinks beverage",
        children: [
          { id: "food-drink-water", name: "水", emoji: "💧", imageQuery: "glass of water", children: [] },
          { id: "food-drink-milk", name: "牛奶", emoji: "🥛", imageQuery: "glass of milk", children: [] },
          { id: "food-drink-juice", name: "果汁", emoji: "🧃", imageQuery: "fruit juice glass", children: [] },
          { id: "food-drink-yogurt", name: "酸奶", emoji: "🥛", imageQuery: "yogurt cup", children: [] },
          { id: "food-drink-soymilk", name: "豆浆", emoji: "☕", imageQuery: "soy milk drink", children: [] },
          { id: "food-drink-soup", name: "汤", emoji: "🍲", imageQuery: "bowl of soup", children: [] }
        ]
      },
      {
        id: "food-snack",
        name: "零食",
        emoji: "🍪",
        imageQuery: "snacks food",
        children: [
          { id: "food-snack-biscuit", name: "饼干", emoji: "🍪", imageQuery: "biscuits cookies", children: [] },
          { id: "food-snack-candy", name: "糖果", emoji: "🍬", imageQuery: "candy sweets", children: [] },
          { id: "food-snack-cake", name: "蛋糕", emoji: "🍰", imageQuery: "cake slice", children: [] },
          { id: "food-snack-icecream", name: "冰淇淋", emoji: "🍦", imageQuery: "ice cream cone", children: [] },
          { id: "food-snack-chips", name: "薯片", emoji: "🥔", imageQuery: "potato chips", children: [] },
          { id: "food-snack-nut", name: "坚果", emoji: "🥜", imageQuery: "nuts snack", children: [] },
          { id: "food-snack-jelly", name: "果冻", emoji: "🍮", imageQuery: "jelly dessert", children: [] }
        ]
      }
    ]
  },

  // ==================== 三、住 ====================
  {
    id: "housing",
    name: "住",
    emoji: "🏠",
    color: "#69DB7C",
    children: [
      {
        id: "housing-room",
        name: "房间",
        emoji: "🚪",
        imageQuery: "room in house",
        children: [
          { id: "housing-room-bedroom", name: "卧室", emoji: "🛏️", imageQuery: "bedroom child room", children: [] },
          { id: "housing-room-living", name: "客厅", emoji: "🛋️", imageQuery: "living room house", children: [] },
          { id: "housing-room-kitchen", name: "厨房", emoji: "🍳", imageQuery: "kitchen room", children: [] },
          { id: "housing-room-bathroom", name: "卫生间", emoji: "🚿", imageQuery: "bathroom clean", children: [] },
          { id: "housing-room-balcony", name: "阳台", emoji: "☀️", imageQuery: "balcony home", children: [] }
        ]
      },
      {
        id: "housing-furniture",
        name: "家具",
        emoji: "🪑",
        imageQuery: "furniture home",
        children: [
          { id: "housing-furniture-bed", name: "床", emoji: "🛏️", imageQuery: "bed furniture", children: [] },
          { id: "housing-furniture-sofa", name: "沙发", emoji: "🛋️", imageQuery: "sofa couch", children: [] },
          { id: "housing-furniture-table", name: "桌子", emoji: "🪑", imageQuery: "table desk", children: [] },
          { id: "housing-furniture-chair", name: "椅子", emoji: "💺", imageQuery: "chair furniture", children: [] },
          { id: "housing-furniture-cabinet", name: "柜子", emoji: "🗄️", imageQuery: "cabinet storage", children: [] },
          { id: "housing-furniture-desk", name: "书桌", emoji: "📚", imageQuery: "desk study table", children: [] }
        ]
      },
      {
        id: "housing-appliance",
        name: "电器",
        emoji: "📺",
        imageQuery: "home appliance",
        children: [
          { id: "housing-appliance-tv", name: "电视", emoji: "📺", imageQuery: "television tv", children: [] },
          { id: "housing-appliance-ac", name: "空调", emoji: "❄️", imageQuery: "air conditioner", children: [] },
          { id: "housing-appliance-fridge", name: "冰箱", emoji: "🧊", imageQuery: "refrigerator fridge", children: [] },
          { id: "housing-appliance-washer", name: "洗衣机", emoji: "🫧", imageQuery: "washing machine", children: [] },
          { id: "housing-appliance-light", name: "灯", emoji: "💡", imageQuery: "lamp light home", children: [] },
          { id: "housing-appliance-fan", name: "电风扇", emoji: "🪭", imageQuery: "electric fan", children: [] }
        ]
      },
      {
        id: "housing-item",
        name: "常用物品",
        emoji: "🔑",
        imageQuery: "household items",
        children: [
          { id: "housing-item-cup", name: "杯子", emoji: "🥤", imageQuery: "cup glass drinkware", children: [] },
          { id: "housing-item-bowl", name: "碗", emoji: "🥣", imageQuery: "bowl dish", children: [] },
          { id: "housing-item-spoon", name: "勺子", emoji: "🥄", imageQuery: "spoon utensil", children: [] },
          { id: "housing-item-towel", name: "毛巾", emoji: "🪥", imageQuery: "towel cloth", children: [] },
          { id: "housing-item-pillow", name: "枕头", emoji: "💤", imageQuery: "pillow bed", children: [] },
          { id: "housing-item-blanket", name: "被子", emoji: "🛌", imageQuery: "blanket quilt", children: [] },
          { id: "housing-item-toothbrush", name: "牙刷", emoji: "🪥", imageQuery: "toothbrush", children: [] },
          { id: "housing-item-comb", name: "梳子", emoji: "🪮", imageQuery: "hair comb brush", children: [] }
        ]
      }
    ]
  },

  // ==================== 四、行 ====================
  {
    id: "travel",
    name: "行",
    emoji: "🚗",
    color: "#4DABF7",
    children: [
      {
        id: "travel-vehicle",
        name: "交通工具",
        emoji: "🚌",
        imageQuery: "transportation vehicle",
        children: [
          { id: "travel-vehicle-car", name: "小汽车", emoji: "🚗", imageQuery: "car vehicle", children: [] },
          { id: "travel-vehicle-bus", name: "公交车", emoji: "🚌", imageQuery: "bus public transport", children: [] },
          { id: "travel-vehicle-subway", name: "地铁", emoji: "🚇", imageQuery: "subway metro train", children: [] },
          { id: "travel-vehicle-bike", name: "自行车", emoji: "🚲", imageQuery: "bicycle bike", children: [] },
          { id: "travel-vehicle-ebike", name: "电动车", emoji: "🛵", imageQuery: "electric scooter bike", children: [] },
          { id: "travel-vehicle-train", name: "火车", emoji: "🚂", imageQuery: "train railway", children: [] },
          { id: "travel-vehicle-taxi", name: "出租车", emoji: "🚕", imageQuery: "taxi cab", children: [] }
        ]
      },
      {
        id: "travel-destination",
        name: "去哪里",
        emoji: "🗺️",
        imageQuery: "destination places",
        children: [
          { id: "travel-destination-school", name: "去学校", emoji: "🏫", imageQuery: "school building", children: [] },
          { id: "travel-destination-park", name: "去公园", emoji: "🌳", imageQuery: "park garden", children: [] },
          { id: "travel-destination-supermarket", name: "去超市", emoji: "🏪", imageQuery: "supermarket grocery store", children: [] },
          { id: "travel-destination-hospital", name: "去医院", emoji: "🏥", imageQuery: "hospital building", children: [] },
          { id: "travel-destination-relative", name: "去亲戚家", emoji: "👨‍👩‍👧", imageQuery: "family visiting relatives", children: [] },
          { id: "travel-destination-playground", name: "去游乐场", emoji: "🎡", imageQuery: "playground children", children: [] }
        ]
      },
      {
        id: "travel-safety",
        name: "路上安全",
        emoji: "🦺",
        imageQuery: "traffic safety child",
        children: [
          { id: "travel-safety-light", name: "红绿灯", emoji: "🚦", imageQuery: "traffic light signal", children: [] },
          { id: "travel-safety-crosswalk", name: "斑马线", emoji: "🦓", imageQuery: "crosswalk pedestrian crossing", children: [] },
          { id: "travel-safety-seatbelt", name: "安全带", emoji: "🔒", imageQuery: "seatbelt car safety", children: [] },
          { id: "travel-safety-helmet", name: "头盔", emoji: "⛑️", imageQuery: "safety helmet", children: [] },
          { id: "travel-safety-holdhands", name: "牵好手", emoji: "🤝", imageQuery: "parent holding child hand", children: [] }
        ]
      },
      {
        id: "travel-items",
        name: "出门带什么",
        emoji: "🎒",
        imageQuery: "travel items bag",
        children: [
          { id: "travel-items-backpack", name: "书包", emoji: "🎒", imageQuery: "child backpack", children: [] },
          { id: "travel-items-bottle", name: "水壶", emoji: "🍼", imageQuery: "water bottle child", children: [] },
          { id: "travel-items-hat", name: "帽子", emoji: "🧢", imageQuery: "child hat outdoor", children: [] },
          { id: "travel-items-jacket", name: "外套", emoji: "🧥", imageQuery: "child jacket outdoor", children: [] },
          { id: "travel-items-tissue", name: "纸巾", emoji: "🧻", imageQuery: "tissue paper pack", children: [] },
          { id: "travel-items-snack", name: "小零食", emoji: "🍪", imageQuery: "snack pack child", children: [] }
        ]
      }
    ]
  },

  // ==================== 五、娱 ====================
  {
    id: "entertainment",
    name: "娱",
    emoji: "🎮",
    color: "#DA77F2",
    children: [
      {
        id: "entertainment-toys",
        name: "玩具",
        emoji: "🧸",
        imageQuery: "children toys",
        children: [
          { id: "entertainment-toys-blocks", name: "积木", emoji: "🧱", imageQuery: "building blocks toy", children: [] },
          { id: "entertainment-toys-doll", name: "娃娃", emoji: "🪆", imageQuery: "doll toy child", children: [] },
          { id: "entertainment-toys-car", name: "小汽车", emoji: "🚗", imageQuery: "toy car child", children: [] },
          { id: "entertainment-toys-puzzle", name: "拼图", emoji: "🧩", imageQuery: "jigsaw puzzle child", children: [] },
          { id: "entertainment-toys-clay", name: "橡皮泥", emoji: "🎨", imageQuery: "play dough clay child", children: [] },
          { id: "entertainment-toys-ball", name: "球", emoji: "⚽", imageQuery: "ball toy child", children: [] },
          { id: "entertainment-toys-robot", name: "机器人", emoji: "🤖", imageQuery: "robot toy child", children: [] },
          { id: "entertainment-toys-dino", name: "恐龙", emoji: "🦕", imageQuery: "dinosaur toy child", children: [] }
        ]
      },
      {
        id: "entertainment-games",
        name: "游戏",
        emoji: "🎯",
        imageQuery: "children games activities",
        children: [
          { id: "entertainment-games-hide", name: "捉迷藏", emoji: "🙈", imageQuery: "children hide and seek", children: [] },
          { id: "entertainment-games-draw", name: "画画", emoji: "🎨", imageQuery: "child drawing painting", children: [] },
          { id: "entertainment-games-sing", name: "唱歌", emoji: "🎤", imageQuery: "child singing", children: [] },
          { id: "entertainment-games-dance", name: "跳舞", emoji: "💃", imageQuery: "child dancing", children: [] },
          { id: "entertainment-games-slide", name: "滑滑梯", emoji: "🛝", imageQuery: "playground slide child", children: [] },
          { id: "entertainment-games-swing", name: "荡秋千", emoji: "🎠", imageQuery: "playground swing child", children: [] },
          { id: "entertainment-games-jump", name: "蹦蹦跳", emoji: "🤸", imageQuery: "child jumping playing", children: [] }
        ]
      },
      {
        id: "entertainment-digital",
        name: "看和听",
        emoji: "📱",
        imageQuery: "child tablet cartoon",
        children: [
          { id: "entertainment-digital-cartoon", name: "看动画", emoji: "📺", imageQuery: "child watching cartoon", children: [] },
          { id: "entertainment-digital-tablet", name: "平板电脑", emoji: "📱", imageQuery: "child tablet device", children: [] },
          { id: "entertainment-digital-music", name: "听音乐", emoji: "🎵", imageQuery: "child listening music", children: [] },
          { id: "entertainment-digital-story", name: "听故事", emoji: "📖", imageQuery: "child listening story audiobook", children: [] }
        ]
      },
      {
        id: "entertainment-outdoor",
        name: "户外活动",
        emoji: "🌳",
        imageQuery: "children outdoor playground",
        children: [
          { id: "entertainment-outdoor-playground", name: "游乐场", emoji: "🎡", imageQuery: "playground outdoor children", children: [] },
          { id: "entertainment-outdoor-zoo", name: "动物园", emoji: "🦁", imageQuery: "zoo animals children", children: [] },
          { id: "entertainment-outdoor-swim", name: "游泳", emoji: "🏊", imageQuery: "child swimming pool", children: [] },
          { id: "entertainment-outdoor-bike", name: "骑车", emoji: "🚲", imageQuery: "child riding bicycle", children: [] },
          { id: "entertainment-outdoor-sand", name: "玩沙子", emoji: "🏖️", imageQuery: "child playing sand beach", children: [] },
          { id: "entertainment-outdoor-bubbles", name: "吹泡泡", emoji: "🫧", imageQuery: "child blowing bubbles", children: [] }
        ]
      },
      {
        id: "entertainment-books",
        name: "看书",
        emoji: "📚",
        imageQuery: "children books reading",
        children: [
          { id: "entertainment-books-picture", name: "绘本", emoji: "📖", imageQuery: "children picture book", children: [] },
          { id: "entertainment-books-sticker", name: "贴纸书", emoji: "⭐", imageQuery: "sticker book child", children: [] },
          { id: "entertainment-books-coloring", name: "涂色书", emoji: "🖍️", imageQuery: "coloring book child", children: [] }
        ]
      }
    ]
  },

  // ==================== 六、情绪/身体 ====================
  {
    id: "emotion",
    name: "情绪/身体",
    emoji: "❤️",
    color: "#F783AC",
    children: [
      {
        id: "emotion-feeling",
        name: "我的心情",
        emoji: "😊",
        imageQuery: "child emotion feeling",
        children: [
          { id: "emotion-feeling-happy", name: "开心", emoji: "😊", imageQuery: "happy child smiling", children: [] },
          { id: "emotion-feeling-sad", name: "难过", emoji: "😢", imageQuery: "sad child crying", children: [] },
          { id: "emotion-feeling-angry", name: "生气", emoji: "😠", imageQuery: "angry child upset", children: [] },
          { id: "emotion-feeling-scared", name: "害怕", emoji: "😨", imageQuery: "scared child afraid", children: [] },
          { id: "emotion-feeling-tired", name: "累了", emoji: "😴", imageQuery: "tired child sleepy", children: [] },
          { id: "emotion-feeling-excited", name: "兴奋", emoji: "🤩", imageQuery: "excited child happy", children: [] },
          { id: "emotion-feeling-bored", name: "无聊", emoji: "😐", imageQuery: "bored child", children: [] }
        ]
      },
      {
        id: "emotion-body",
        name: "身体部位",
        emoji: "🧍",
        imageQuery: "child body parts",
        children: [
          { id: "emotion-body-head", name: "头", emoji: "🗣️", imageQuery: "child head", children: [] },
          { id: "emotion-body-eye", name: "眼睛", emoji: "👁️", imageQuery: "child eye", children: [] },
          { id: "emotion-body-nose", name: "鼻子", emoji: "👃", imageQuery: "child nose", children: [] },
          { id: "emotion-body-mouth", name: "嘴巴", emoji: "👄", imageQuery: "child mouth", children: [] },
          { id: "emotion-body-ear", name: "耳朵", emoji: "👂", imageQuery: "child ear", children: [] },
          { id: "emotion-body-hand", name: "手", emoji: "✋", imageQuery: "child hand", children: [] },
          { id: "emotion-body-foot", name: "脚", emoji: "🦶", imageQuery: "child foot", children: [] },
          { id: "emotion-body-tummy", name: "肚子", emoji: "🤰", imageQuery: "child tummy belly", children: [] },
          { id: "emotion-body-tooth", name: "牙齿", emoji: "🦷", imageQuery: "child tooth smile", children: [] }
        ]
      },
      {
        id: "emotion-sensation",
        name: "身体感觉",
        emoji: "🤒",
        imageQuery: "child feeling sensation",
        children: [
          { id: "emotion-sensation-pain", name: "疼", emoji: "🤕", imageQuery: "child in pain hurt", children: [] },
          { id: "emotion-sensation-itchy", name: "痒", emoji: "😣", imageQuery: "child itchy scratching", children: [] },
          { id: "emotion-sensation-cold", name: "冷", emoji: "🥶", imageQuery: "child feeling cold", children: [] },
          { id: "emotion-sensation-hot", name: "热", emoji: "🥵", imageQuery: "child feeling hot", children: [] },
          { id: "emotion-sensation-sleepy", name: "困", emoji: "🥱", imageQuery: "child sleepy yawning", children: [] },
          { id: "emotion-sensation-thirsty", name: "渴", emoji: "🥵", imageQuery: "child thirsty drinking", children: [] },
          { id: "emotion-sensation-hungry", name: "饿", emoji: "😋", imageQuery: "child hungry eating", children: [] },
          { id: "emotion-sensation-dizzy", name: "晕", emoji: "😵", imageQuery: "child dizzy", children: [] }
        ]
      },
      {
        id: "emotion-need",
        name: "我需要帮助",
        emoji: "🆘",
        imageQuery: "child needs help",
        children: [
          { id: "emotion-need-toilet", name: "上厕所", emoji: "🚽", imageQuery: "child toilet bathroom", children: [] },
          { id: "emotion-need-water", name: "要喝水", emoji: "💧", imageQuery: "child drinking water", children: [] },
          { id: "emotion-need-sick", name: "不舒服", emoji: "🤒", imageQuery: "child feeling sick unwell", children: [] },
          { id: "emotion-need-rest", name: "想休息", emoji: "😴", imageQuery: "child resting sleeping", children: [] },
          { id: "emotion-need-hug", name: "要抱抱", emoji: "🤗", imageQuery: "parent hugging child", children: [] },
          { id: "emotion-need-play", name: "想玩", emoji: "🎯", imageQuery: "child wants to play", children: [] },
          { id: "emotion-need-eat", name: "想吃饭", emoji: "🍽️", imageQuery: "child wants to eat", children: [] },
          { id: "emotion-need-home", name: "想回家", emoji: "🏠", imageQuery: "child wants to go home", children: [] }
        ]
      }
    ]
  }
];

// 从 localStorage 加载自定义数据，否则使用默认数据
function loadMenuData() {
  try {
    const saved = localStorage.getItem('lse_menuData');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('加载自定义菜单数据失败，使用默认数据', e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_MENU_DATA)); // 深拷贝
}

// 保存菜单数据到 localStorage
function saveMenuData(data) {
  try {
    localStorage.setItem('lse_menuData', JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('保存菜单数据失败', e);
    return false;
  }
}

// 重置为默认数据
function resetMenuData() {
  localStorage.removeItem('lse_menuData');
  return JSON.parse(JSON.stringify(DEFAULT_MENU_DATA));
}
