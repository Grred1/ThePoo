// ============================================================
//  《屎记》便便图鉴数据库  poopDatabase.js
//  用法：import { POOP_DATABASE, getRarityConfig } from './poopDatabase'
// ============================================================

// ---------- 稀有度配置 ----------
export const RARITY_CONFIG = {
  common: {
    label: '普通',
    color: '#9e9e9e',
    borderColor: '#bdbdbd',
    bgColor: '#f5f5f5',
    glowColor: 'rgba(158,158,158,0.3)',
    animation: 'none',
  },
  rare: {
    label: '稀有',
    color: '#1976d2',
    borderColor: '#42a5f5',
    bgColor: '#e3f2fd',
    glowColor: 'rgba(66,165,245,0.4)',
    animation: 'glow-pulse 2s ease-in-out infinite',
  },
  epic: {
    label: '史诗',
    color: '#7b1fa2',
    borderColor: '#ab47bc',
    bgColor: '#f3e5f5',
    glowColor: 'rgba(171,71,188,0.5)',
    animation: 'epic-shimmer 1.5s linear infinite',
  },
  legendary: {
    label: '传说',
    color: '#f57f17',
    borderColor: '#ffd700',
    bgColor: '#1a1a2e',
    textColor: '#ffd700',
    glowColor: 'rgba(255,215,0,0.6)',
    animation: 'legendary-particle 1s ease-in-out infinite',
  },
  mystery: {
    label: '神秘',
    color: '#fff',
    borderColor: 'rainbow',          // CSS: linear-gradient 实现
    bgColor: '#0d0d0d',
    textColor: '#fff',
    glowColor: 'rgba(255,255,255,0.6)',
    animation: 'rainbow-border 2s linear infinite',
  },
};

// ---------- 便便形状枚举（供筛选/随机使用）----------
export const POOP_SHAPES = {
  HARD_BALL:  'hard_ball',    // 一颗颗硬球型
  SAUSAGE:    'sausage',      // 香肠状
  SOFT:       'soft',         // 软便型
  MUSHY:      'mushy',        // 糊状便型
  LIQUID:     'liquid',       // 水状便型
  SPECIAL:    'special',      // 特殊形状
};

// ---------- 图片资源（本地 png）----------
// 说明：
// 1) 请将本次生成的 png 放到项目根目录的 ./assets/poop_assets/ 目录中
// 2) 这里使用 new URL(..., import.meta.url) 生成可被打包器识别的资源地址（Vite/webpack 等）
const asset = (filename) => new URL(`../assets/poop_assets/${filename}`, import.meta.url).href;

export const POOP_IMAGE_MAP = {
  // 神秘 / 限定
  numb_legs: asset('pixel_poop_numb_legs_noodle_transparent.png'),
  tiny_mystery: asset('pixel_poop_tiny_question_mark_transparent.png'),
  long_wait: asset('pixel_poop_long_wait_transparent.png'),

  // 普通：硬球
  dumb_ball: asset('pixel_poop_dumb_pellets_transparent.png'),
  huddle_ball: asset('pixel_poop_cozy_pellets_transparent.png'),
  matcha_ball: asset('pixel_poop_matcha_redbean_pellets_transparent.png'),
  shy_blush_ball: asset('pixel_poop_shy_blush_pellets_transparent.png'),

  // 普通：香肠
  classic_sausage: asset('pixel_poop_classic_sausage_transparent.png'),
  stretch_sausage: asset('pixel_poop_stretchy_sausage_transparent.png'),
  curious_sausage: asset('pixel_poop_curious_sausage_transparent.png'),
  tomato_sausage: asset('pixel_poop_tomato_pasta_sausage_transparent.png'),
  bubble_sausage: asset('pixel_poop_burp_bubble_sausage_transparent.png'),

  // 普通：软便
  lazy_soft: asset('pixel_poop_lazy_softserve_transparent.png'),
  lying_soft: asset('pixel_poop_side_lie_giveup_transparent.png'),
  shy_soft: asset('pixel_poop_shy_soft_transparent.png'),
  corn_soft: asset('pixel_poop_corn_kernels_soft_transparent.png'),

  // 普通：糊状
  random_mush: asset('pixel_poop_freeform_mushy_transparent.png'),
  angry_mush: asset('pixel_poop_angry_mushy_transparent.png'),
  shrug_mush: asset('pixel_poop_shrug_mushy_transparent.png'),
  dark_sesame: asset('pixel_poop_black_sesame_mushy_transparent.png'),
  melt_icecream: asset('pixel_poop_melting_icecream_mushy_transparent.png'),

  // 普通：水状
  sad_liquid: asset('pixel_poop_sad_watery_transparent.png'),
  dizzy_liquid: asset('pixel_poop_dizzy_watery_transparent.png'),
  energetic_liquid: asset('pixel_poop_party_watery_transparent.png'),
  surprised_liquid: asset('pixel_poop_surprised_splash_watery_transparent.png'),

  // 普通：蔬菜水果类
  broccoli: asset('pixel_poop_broccoli.png'),
  carrot: asset('pixel_poop_carrot.png'),
  grape: asset('pixel_poop_grape.png'),
  pinapple: asset('pixel_poop_pinapple.png'),
  strawberry: asset('pixel_poop_strawberry.png'),
  rainbow: asset('pixel_poop_rainbow.png'),


  // 稀有（已生成的像素图）
  early_rage: asset('pixel_poop_angry_storm_pellets_transparent.png'),
  caffeine_overload: asset('pixel_poop_caffeine_overload_transparent.png'),
  e_break: asset('pixel_poop_smoke_break_transparent.png'),
  off_work_countdown: asset('pixel_poop_clockout_countdown_pellets_transparent.png'),
  ten_second_dash: asset('pixel_poop_ten_second_sprint_transparent.png'),
  post_meal: asset('pixel_poop_contented_belly_pat_transparent.png'),
  nap_overload: asset('pixel_poop_sleepy_nap_bubble_transparent.png'),
  midnight_shadow: asset('pixel_poop_midnight_lonely_transparent.png'),
  tea_time: asset('pixel_poop_afternoon_tea_transparent.png'),

  // 史诗（已生成的像素图）
  shocking: asset('pixel_poop_shocked_big_bang_transparent.png'),
  circuit_gut: asset('pixel_poop_confusing_circuit_aura_transparent.png'),
  sage_moment: asset('pixel_poop_sage_moment_transparent.png'),
  disenchanted: asset('pixel_poop_disenchanted_zen_transparent.png'),

  // 新增（24-29）
  dont_want_work: asset('pixel_poop_low_energy_saver_transparent.png'),
  huaqiang_melon: asset('pixel_poop_huaqiang_melon_transparent.png'),
  classy_penguin: asset('pixel_poop_classy_penguin_transparent.png'),
  cyber_woodfish: asset('pixel_poop_cyber_woodfish_transparent.png'),
  national_producer: asset('pixel_poop_national_producer_transparent.png'),
  midnight_ghost: asset('pixel_poop_midnight_ghost_transparent.png'),


  // 补充缺少的图片
  salary_thief:asset('pixel_poop_salary_thief.png'),
  streak_legend_1: asset('pixel_poop_streak_legend_1_dawn_transparent.png'),
  streak_legend_2: asset('pixel_poop_streak_legend_2_fire_transparent.png'),
  streak_legend_3: asset('pixel_poop_streak_legend_3_cosmos_transparent.png')

};

// ============================================================
//  主数据库
//  每条字段说明：
//    id          唯一标识符（英文 snake_case）
//    name        展示名称
//    rarity      稀有度：'common' | 'rare' | 'epic' | 'legendary' | 'mystery'
//    shape       形状分类（见 POOP_SHAPES）
//    emoji       卡片展示 emoji（可叠加）
//    bgColor     卡片背景色（覆盖 RARITY_CONFIG 默认值）
//    desc        简介文案
//    trigger     触发条件说明（中文，用于讯息纸条）
//    triggerFn   触发判断函数参数说明（见掉落逻辑注释）
// ============================================================

export const POOP_DATABASE = [

  // ════════════════════════════════════════
  //  神秘 / 限定款（强制触发，优先级最高）
  // ════════════════════════════════════════
  {
    id: 'numb_legs',
    name: '双腿发麻便',
    rarity: 'mystery',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '💺💩⚡',
    image: POOP_IMAGE_MAP.numb_legs,
    desc: '它出来了，但你的腿可能暂时带不走了。向每一位在马桶上坚持到底的勇士致敬！',
    trigger: '单次计时 > 15分钟',
    triggerFn: { type: 'duration_over', minutes: 15 },
  },
  {
    id: 'tiny_mystery',
    name: '超小问号便',
    rarity: 'mystery',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '🔹💩❓',
    image: POOP_IMAGE_MAP.tiny_mystery,
    desc: '存在感极低，仿佛从未出现过。你是来擦屁股的吗？旁边打着一个巨大的问号。',
    trigger: '单次计时 < 5秒',
    triggerFn: { type: 'duration_under', seconds: 5 },
  },
  {
    id: 'long_wait',
    name: '漫长等待',
    rarity: 'mystery',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '⏳💩😮‍💨',
    image: POOP_IMAGE_MAP.long_wait,
    desc: '在时间的泥潭里憋了太久，它的边缘有些干涸，那是无聊在空气中氧化后的痕迹。',
    trigger: '单次计时超过 2 小时',
    triggerFn: { type: 'duration_over', minutes: 120 },
  },

  // ════════════════════════════════════════
  //  普通款（30 种）
  // ════════════════════════════════════════

  // —— 硬球型 ——
  {
    id: 'dumb_ball',
    name: '呆萌硬球',
    rarity: 'common',
    shape: POOP_SHAPES.HARD_BALL,
    emoji: '💩',
    image: POOP_IMAGE_MAP.dumb_ball,
    desc: '三颗圆滚滚的小家伙叠在一起，表情呆呆的。虽然有点硬，但也是努力成型的证明。',
    trigger: '基础掉落，硬球型',
    triggerFn: { type: 'base_drop', shape: 'hard_ball' },
  },
  {
    id: 'huddle_ball',
    name: '抱团取暖球',
    rarity: 'common',
    shape: POOP_SHAPES.HARD_BALL,
    emoji: '💩🤗',
    image: POOP_IMAGE_MAP.huddle_ball,
    desc: '几颗小球紧紧挤在一起，互相依偎，闭着眼睛一脸享受。虽然硬，但它们内心是温暖的。',
    trigger: '基础掉落，硬球型',
    triggerFn: { type: 'base_drop', shape: 'hard_ball' },
  },
  {
    id: 'matcha_ball',
    name: '抹茶红豆球',
    rarity: 'common',
    shape: POOP_SHAPES.HARD_BALL,
    emoji: '🟢💩',
    image: POOP_IMAGE_MAP.matcha_ball,
    bgColor: '#e8f5e9',
    desc: '大概是昨天蔬菜沙拉吃多了？它带着一身清新的草绿色，看起来比普通的粑粑健康了一点点。',
    trigger: '基础掉落，硬球型（颜色偏绿）',
    triggerFn: { type: 'base_drop', shape: 'hard_ball' },
  },
  {
    id: 'shy_blush_ball',
    name: '害羞脸红球',
    rarity: 'common',
    shape: POOP_SHAPES.HARD_BALL,
    emoji: '😊💩',
    image: POOP_IMAGE_MAP.shy_blush_ball,
    desc: '因为被盯着看而感到不好意思，脸颊鼓起了两团粉红色的红晕。它是一颗内向的小硬球。',
    trigger: '基础掉落，硬球型',
    triggerFn: { type: 'base_drop', shape: 'hard_ball' },
  },

  // —— 香肠状 ——
  {
    id: 'classic_sausage',
    name: '经典香肠',
    rarity: 'common',
    shape: POOP_SHAPES.SAUSAGE,
    emoji: '💩😊',
    image: POOP_IMAGE_MAP.classic_sausage,
    desc: '最标准的S型，表面光滑，带着自信的微笑。它是图鉴里的"标准答案"，肠道健康的模范生。',
    trigger: '基础掉落，香肠状',
    triggerFn: { type: 'base_drop', shape: 'sausage' },
  },
  {
    id: 'stretch_sausage',
    name: '伸懒腰香肠',
    rarity: 'common',
    shape: POOP_SHAPES.SAUSAGE,
    emoji: '💩🙆',
    image: POOP_IMAGE_MAP.stretch_sausage,
    desc: '刚被拉出来，它舒服地伸了一个大大的懒腰，身体拉得比平时更长一点，表情极其舒展。',
    trigger: '基础掉落，香肠状',
    triggerFn: { type: 'base_drop', shape: 'sausage' },
  },
  {
    id: 'curious_sausage',
    name: '好奇探头肠',
    rarity: 'common',
    shape: POOP_SHAPES.SAUSAGE,
    emoji: '💩🧐',
    image: POOP_IMAGE_MAP.curious_sausage,
    desc: '身体盘在底座上，但把"头"高高抬起，歪着脑袋打量这个世界。充满了对马桶外世界的好奇。',
    trigger: '基础掉落，香肠状',
    triggerFn: { type: 'base_drop', shape: 'sausage' },
  },
  {
    id: 'tomato_sausage',
    name: '番茄意面肠',
    rarity: 'common',
    shape: POOP_SHAPES.SAUSAGE,
    emoji: '🍝💩',
    image: POOP_IMAGE_MAP.tomato_sausage,
    bgColor: '#fff3e0',
    desc: '昨晚的火龙果或者番茄意面立大功了。它披着一身红橙色的外衣，是厕所里最鲜艳的一抹色彩。',
    trigger: '基础掉落，香肠状（颜色偏红橙）',
    triggerFn: { type: 'base_drop', shape: 'sausage' },
  },
  {
    id: 'bubble_sausage',
    name: '气泡打嗝肠',
    rarity: 'common',
    shape: POOP_SHAPES.SAUSAGE,
    emoji: '💩🫧',
    image: POOP_IMAGE_MAP.bubble_sausage,
    desc: '碳酸饮料喝多了的后果。它一边努力成型，一边忍不住打了一个小小的嗝，嘴边飘着一个透明气泡。',
    trigger: '基础掉落，香肠状',
    triggerFn: { type: 'base_drop', shape: 'sausage' },
  },

  // —— 软便型 ——
  {
    id: 'lazy_soft',
    name: '慵懒软便',
    rarity: 'common',
    shape: POOP_SHAPES.SOFT,
    emoji: '🍦💩',
    image: POOP_IMAGE_MAP.lazy_soft,
    desc: '像一坨融化的软冰淇淋，瘫在底座上，表情慵懒。它只想静静地躺着，不想被冲走。',
    trigger: '基础掉落，软便型',
    triggerFn: { type: 'base_drop', shape: 'soft' },
  },
  {
    id: 'lying_soft',
    name: '侧躺摆烂软便',
    rarity: 'common',
    shape: POOP_SHAPES.SOFT,
    emoji: '😶💩',
    image: POOP_IMAGE_MAP.lying_soft,
    desc: '连瘫着都觉得累，干脆侧身躺平。它用实力演绎了什么是"彻底的摆烂"，眼神空洞地望着天花板。',
    trigger: '基础掉落，软便型',
    triggerFn: { type: 'base_drop', shape: 'soft' },
  },
  {
    id: 'shy_soft',
    name: '害羞捂脸软便',
    rarity: 'common',
    shape: POOP_SHAPES.SOFT,
    emoji: '😳💩',
    image: POOP_IMAGE_MAP.shy_soft,
    desc: '因为自己太软了而感到不好意思，用软乎乎的身体边缘捂住脸，粉粉的超害羞。',
    trigger: '基础掉落，软便型',
    triggerFn: { type: 'base_drop', shape: 'soft' },
  },
  {
    id: 'corn_soft',
    name: '玉米粒奇遇',
    rarity: 'common',
    shape: POOP_SHAPES.SOFT,
    emoji: '🌽💩',
    image: POOP_IMAGE_MAP.corn_soft,
    desc: '著名的"明天见"食材。它的身上随机镶嵌着几颗可爱的黄色小玉米粒，记录了上一顿饭的匆匆过客。',
    trigger: '基础掉落，软便型',
    triggerFn: { type: 'base_drop', shape: 'soft' },
  },

  // —— 糊状型 ——
  {
    id: 'random_mush',
    name: '随性糊糊',
    rarity: 'common',
    shape: POOP_SHAPES.MUSHY,
    emoji: '💩✨',
    image: POOP_IMAGE_MAP.random_mush,
    desc: '边缘模糊，没有固定的形状。它很有个性，不受任何物理规则的束缚，主打一个随性。',
    trigger: '基础掉落，糊状型',
    triggerFn: { type: 'base_drop', shape: 'mushy' },
  },
  {
    id: 'angry_mush',
    name: '炸毛愤怒糊糊',
    rarity: 'common',
    shape: POOP_SHAPES.MUSHY,
    emoji: '😡💩',
    image: POOP_IMAGE_MAP.angry_mush,
    desc: '虽然没有固定形状，但它脾气很大！边缘炸起了不规则的小尖刺，眉头紧锁，气鼓鼓的。',
    trigger: '基础掉落，糊状型',
    triggerFn: { type: 'base_drop', shape: 'mushy' },
  },
  {
    id: 'shrug_mush',
    name: '艺术摊手糊糊',
    rarity: 'common',
    shape: POOP_SHAPES.MUSHY,
    emoji: '🤷💩',
    image: POOP_IMAGE_MAP.shrug_mush,
    desc: '它摊开双手（身体边缘），仿佛在说："我就长这样，我也没办法。"一种充满哲学意味的无奈。',
    trigger: '基础掉落，糊状型',
    triggerFn: { type: 'base_drop', shape: 'mushy' },
  },
  {
    id: 'dark_sesame',
    name: '黑芝麻糊糊',
    rarity: 'common',
    shape: POOP_SHAPES.MUSHY,
    emoji: '⚫💩',
    image: POOP_IMAGE_MAP.dark_sesame,
    bgColor: '#212121',
    desc: '颜色深得发黑，像是混入了黑芝麻或者奥利奥。它看起来有点酷，虽然本质上还是一坨糊糊。',
    trigger: '基础掉落，糊状型（颜色深黑）',
    triggerFn: { type: 'base_drop', shape: 'mushy' },
  },
  {
    id: 'melt_icecream',
    name: '融化雪糕',
    rarity: 'common',
    shape: POOP_SHAPES.MUSHY,
    emoji: '🍨💩',
    image: POOP_IMAGE_MAP.melt_icecream,
    desc: '比普通糊糊更稀一点，像是一根被遗忘在太阳下的雪糕。它正在努力地向四周扩散，不想被扫走。',
    trigger: '基础掉落，糊状型',
    triggerFn: { type: 'base_drop', shape: 'mushy' },
  },

  // —— 水状型 ——
  {
    id: 'sad_liquid',
    name: '悲伤水水',
    rarity: 'common',
    shape: POOP_SHAPES.LIQUID,
    emoji: '😢💩',
    image: POOP_IMAGE_MAP.sad_liquid,
    desc: '一滩没有骨气的小水洼，眼角挂着泪珠。可能是因为吃坏了肚子，看起来非常委屈。',
    trigger: '基础掉落，水状型',
    triggerFn: { type: 'base_drop', shape: 'liquid' },
  },
  {
    id: 'dizzy_liquid',
    name: '晕头转向水水',
    rarity: 'common',
    shape: POOP_SHAPES.LIQUID,
    emoji: '😵💩',
    image: POOP_IMAGE_MAP.dizzy_liquid,
    desc: '因为冲水时的离心力而晕头转向，眼睛变成了蚊香圈，周围飘着几颗小星星。',
    trigger: '基础掉落，水状型',
    triggerFn: { type: 'base_drop', shape: 'liquid' },
  },
  {
    id: 'energetic_liquid',
    name: '活泼跳跳水',
    rarity: 'common',
    shape: POOP_SHAPES.LIQUID,
    emoji: '🎉💩',
    image: POOP_IMAGE_MAP.energetic_liquid,
    desc: '虽然是一滩水，但精力旺盛。它正在用力溅起水花，仿佛在开派对，表情兴奋极了。',
    trigger: '基础掉落，水状型',
    triggerFn: { type: 'base_drop', shape: 'liquid' },
  },
  {
    id: 'surprised_liquid',
    name: '惊讶水滴',
    rarity: 'common',
    shape: POOP_SHAPES.LIQUID,
    emoji: '😮💩',
    image: POOP_IMAGE_MAP.surprised_liquid,
    desc: '因为落地速度太快而吓了一跳！它溅起了几滴小水花，表情惊讶，仿佛在说"我怎么掉下来了？"',
    trigger: '基础掉落，水状型',
    triggerFn: { type: 'base_drop', shape: 'liquid' },
  },

  // ══普通蔬菜水果类═════════════════════════════
  {
    id: 'broccoli',
    name: '西兰花养生糊',
    rarity: 'common',
    shape: POOP_SHAPES.MUSHY,
    emoji: '🥦💩',
    image: POOP_IMAGE_MAP.broccoli,
    bgColor: '#e8f5e9',
    desc: '一顿认真吃蔬菜的代价。它通体黄绿，顶部长出了一朵迷你西兰花，散发着清流健康人的傲娇气息。今天的膳食纤维，交代了。',
    trigger: '稀有概率随机，或天气切换为"养生模式"时概率提升',
    triggerFn: { type: 'random', rarity: 'rare' },
  },

  {
    id: 'carrot',
    name: '胡萝卜塔',
    rarity: 'common',
    shape: POOP_SHAPES.SAUSAGE,
    emoji: '🥕💩',
    image: POOP_IMAGE_MAP.carrot,
    bgColor: '#fff3e0',
    desc: '螺旋盘绕，顶部冒出一撮绿叶，像一根倔强的胡萝卜决定以便便的形态重返人间。橙意盎然，维生素A含量感人。',
    trigger: '稀有概率随机',
    triggerFn: { type: 'random', rarity: 'rare' },
  },

  {
    id: 'grape',
    name: '紫葡萄串',
    rarity: 'common',
    shape: POOP_SHAPES.HARD_BALL,
    emoji: '🍇💩',
    image: POOP_IMAGE_MAP.grape,
    bgColor: '#ede7f6',
    desc: '由十几颗圆润饱满的紫色球粒组成，顶部还挂着一片精致的绿叶。你上周吃的那串葡萄终于走完了它的旅程，转世成为一件艺术品。',
    trigger: '史诗概率随机',
    triggerFn: { type: 'random', rarity: 'epic' },
  },

  {
    id: 'pineapple',
    name: '菠萝王座',
    rarity: 'common',
    shape: POOP_SHAPES.SAUSAGE,
    emoji: '🍍💩',
    image: POOP_IMAGE_MAP.pinapple,
    bgColor: '#fffde7',
    desc: '全身覆盖着菠萝纹路的黄金鳞甲，头顶翠绿王冠傲然挺立。菠萝派之争从未停止，而今天的菠萝，选择了便便这条路。它是如此的金灿、如此的扎实。',
    trigger: '史诗概率随机',
    triggerFn: { type: 'random', rarity: 'epic' },
  },

  {
    id: 'rainbow',
    name: '彩虹独角兽',
    rarity: 'common',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '🌈🦄💩',
    image: POOP_IMAGE_MAP.rainbow,
    bgColor: '#1a0a2e',
    textColor: '#ffffff',
    desc: '传说中只有心怀纯粹之人才能拉出的神圣便便。它以彩虹为笔，以星光为墨，浑身缀满了闪烁的宝石光点。有人说看见它会带来好运，有人说这是肠道的最高荣耀。',
    trigger: '传说概率随机，或连续打卡期间由幸运积分保底触发',
    triggerFn: { type: 'random', rarity: 'legendary' },
    specialEffect: 'particle_rainbow',
  },

  {
    id: 'strawberry',
    name: '草莓大福软便',
    rarity: 'common',
    shape: POOP_SHAPES.SOFT,
    emoji: '🍓💩',
    image: POOP_IMAGE_MAP.strawberry,
    bgColor: '#fce4ec',
    desc: '圆润饱满，通体玫瑰红，表面点缀着黄色的芝麻种子，顶部还扎着一撮新鲜绿叶。它甜蜜、丰盛，像一颗溢出来的草莓大福。你的胃是个浪漫主义者。',
    trigger: '稀有概率随机，或雨天时"滋润型"概率提升',
    triggerFn: { type: 'random', rarity: 'rare' },
  },

  // ════════════════════════════════════════
  //  稀有款（15 种）
  //  触发：达到稀有概率区间 or 特定时间/条件
  // ════════════════════════════════════════

  {
    id: 'salary_thief',
    name: '薪水小偷',
    rarity: 'rare',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '💰💩',
    desc: '在公司最隐秘的角落，你用时间换取了金钱。它是每一位职场摸鱼艺术家的数字勋章。',
    trigger: '单次计时 10~15 分钟',
    triggerFn: { type: 'duration_range', minMinutes: 10, maxMinutes: 15 },
  },
  {
    id: 'early_rage',
    name: '早八怨气',
    rarity: 'rare',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '😤💩⛈️',
    image: POOP_IMAGE_MAP.early_rage,
    bgColor: '#263238',
    desc: '裹挟着早高峰的拥挤、没睡饱的愤怒以及对打卡的恐惧。它很沉重，像极了你此刻的心情。',
    trigger: '周一至周五，早上 08:00~09:00 结算',
    triggerFn: { type: 'time_window', days: [1,2,3,4,5], hourStart: 8, hourEnd: 9 },
  },
  {
    id: 'caffeine_overload',
    name: '咖啡因超载',
    rarity: 'rare',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '☕💩',
    image: POOP_IMAGE_MAP.caffeine_overload,
    bgColor: '#3e2723',
    desc: '由冰美式和生椰拿铁强行催化出来的产物。心率在飙升，灵魂在漂移，身体在排毒。',
    trigger: '中午 13:00~14:00 结算',
    triggerFn: { type: 'time_window', days: [0,1,2,3,4,5,6], hourStart: 13, hourEnd: 14 },
  },
  {
    id: 'e_break',
    name: '电子放风者',
    rarity: 'rare',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '🚬💩',
    image: POOP_IMAGE_MAP.e_break,
    desc: '你只是想离开工位走走。它带着一丝烟雾缭绕的疲惫，是当代人短暂逃避现实的缩影。',
    trigger: '单次计时约 5 分钟',
    triggerFn: { type: 'duration_range', minMinutes: 4, maxMinutes: 6 },
  },
  {
    id: 'off_work_countdown',
    name: '倒数下班',
    rarity: 'rare',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '🎵💩',
    image: POOP_IMAGE_MAP.off_work_countdown,
    desc: '身体还在工位，灵魂已经打车到了三公里外。它散发着一种即将解脱的欢快律动。',
    trigger: '17:50~18:00 之间结算',
    triggerFn: { type: 'time_window', days: [0,1,2,3,4,5,6], hourStart: 17, minuteStart: 50, hourEnd: 18, minuteEnd: 0 },
  },
  {
    id: 'ten_second_dash',
    name: '十秒狂奔',
    rarity: 'rare',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '💨💩',
    image: POOP_IMAGE_MAP.ten_second_dash,
    desc: '太快了！它甚至还没来得及在点阵世界里凝聚成型，就被你粗暴地拽了出来。',
    trigger: '单次计时低于 10 秒',
    triggerFn: { type: 'duration_under', seconds: 10 },
  },
  {
    id: 'post_meal',
    name: '饭后百步',
    rarity: 'rare',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '🍱💩',
    image: POOP_IMAGE_MAP.post_meal,
    desc: '饱腹感带来的安逸产物，平庸、温和、没有攻击性，散发着食物消化的自然规律。',
    trigger: '12:30~13:00 或 19:00~19:30 结算',
    triggerFn: { type: 'multi_time_window', windows: [{hourStart:12,minuteStart:30,hourEnd:13,minuteEnd:0},{hourStart:19,minuteStart:0,hourEnd:19,minuteEnd:30}] },
  },
  {
    id: 'nap_overload',
    name: '午觉过载',
    rarity: 'rare',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '😪💩',
    image: POOP_IMAGE_MAP.nap_overload,
    desc: '本想眯一下，结果一睁眼不知道自己身处何方。这坨造物沾满了午睡流延的懵逼质感。',
    trigger: '计时 45~60 分钟，且在 13:00~15:00',
    triggerFn: { type: 'duration_and_time', minMinutes: 45, maxMinutes: 60, hourStart: 13, hourEnd: 15 },
  },
  {
    id: 'midnight_shadow',
    name: '凌晨孤影',
    rarity: 'rare',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '🌑💩',
    image: POOP_IMAGE_MAP.midnight_shadow,
    bgColor: '#1a1a2e',
    desc: '这个点还不睡的人，心里一定藏着秘密。它是深夜里对手机屏幕亮光的无声回应。',
    trigger: '凌晨 01:00~03:00 结算',
    triggerFn: { type: 'time_window', days: [0,1,2,3,4,5,6], hourStart: 1, hourEnd: 3 },
  },
  {
    id: 'tea_time',
    name: '三点几饮茶先',
    rarity: 'rare',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '🍵💩',
    image: POOP_IMAGE_MAP.tea_time,
    bgColor: '#fff3e0',
    desc: '神圣的饮茶时间到了！它散发着极其慵懒的波纹，掉落时屏幕背景会短暂切换为夕阳色。',
    trigger: '连续 3 天，精准在 15:15~15:30 结算',
    triggerFn: { type: 'streak_and_time', streakDays: 3, hourStart: 15, minuteStart: 15, hourEnd: 15, minuteEnd: 30 },
  },
  {
    id: 'dont_want_work',
    name: '不想上班',
    rarity: 'rare',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '🫠💩',
    image: POOP_IMAGE_MAP.dont_want_work,
    bgColor: '#eeeeee',
    desc: '假期结束返岗前拉出来的便便，浑身散发着“不想上班”的灰败能量，希望被回收回去。',
    trigger: '假期结束返岗前（暂按稀有概率随机）',
    triggerFn: { type: 'random', rarity: 'rare' },
  },
  {
    id: 'national_producer',
    name: '全民制作人',
    rarity: 'rare',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '🩷💩',
    image: POOP_IMAGE_MAP.national_producer,
    bgColor: '#fce4ec',
    desc: '对陌生人操心程度堪比亲妈的产物，评论区催更、养生宝典、情感指导全包，操心中带着一身红色民选热情。',
    trigger: '民选热情（暂按稀有概率随机）',
    triggerFn: { type: 'random', rarity: 'rare' },
  },
  // {
  //   id: 'no_wifi',
  //   name: '断网幸存者',
  //   rarity: 'rare',
  //   shape: POOP_SHAPES.SPECIAL,
  //   emoji: '📡💩',
  //   desc: '在失联荒野中幸存下来的勇士，身后拖着一根断开的网线插头。',
  //   trigger: '计时期间 Wi-Fi 断开超过 5 分钟（模拟：点击"我断网了"按钮）',
  //   triggerFn: { type: 'user_flag', flag: 'no_wifi' },
  // },
  // {
  //   id: 'fragile_student',
  //   name: '脆皮大学生',
  //   rarity: 'rare',
  //   shape: POOP_SHAPES.SPECIAL,
  //   emoji: '🩹💩',
  //   desc: '年纪轻轻一碰就碎，散发着虚弱的灰色光环，仿佛下一刻就要请病假。',
  //   trigger: '计时开始前标记身体不适，且计时 < 5 分钟',
  //   triggerFn: { type: 'user_flag_and_duration', flag: 'body_pain', maxMinutes: 5 },
  // },
  // {
  //   id: 'singularity',
  //   name: '奇点便便',
  //   rarity: 'rare',
  //   shape: POOP_SHAPES.SPECIAL,
  //   emoji: '⚫💩',
  //   bgColor: '#000000',
  //   desc: '表面呈极致黑洞黑色，笼罩着幽蓝色的霍金辐射光晕，表面不停流淌着二进制代码雨。',
  //   trigger: '稀有概率随机',
  //   triggerFn: { type: 'random', rarity: 'rare' },
  // },
  // {
  //   id: 'lucky_emperor',
  //   name: '欧皇便便',
  //   rarity: 'rare',
  //   shape: POOP_SHAPES.SPECIAL,
  //   emoji: '👑💩🌈',
  //   bgColor: '#fffde7',
  //   desc: '通体纯金色，表面如抛光黄金般闪亮。镶嵌着像素风格的幸运符号：四叶草、元宝、锦鲤、红包和彩虹。',
  //   trigger: '稀有概率随机',
  //   triggerFn: { type: 'random', rarity: 'rare' },
  // },
  // {
  //   id: 'self_love',
  //   name: '爱你老己',
  //   rarity: 'rare',
  //   shape: POOP_SHAPES.SPECIAL,
  //   emoji: '🩷💩',
  //   bgColor: '#fce4ec',
  //   desc: '拉屎三分钟也是爱自己的证明。它散发着温柔的暖光，提醒你今天也要好好照顾"老己"。',
  //   trigger: '稀有概率随机',
  //   triggerFn: { type: 'random', rarity: 'rare' },
  // },

  // // ════════════════════════════════════════
  // //  史诗款（8 种）—— 部分待策划补充，先填入已有
  // // ════════════════════════════════════════

  // {
  //   id: 'dark_aura',
  //   name: '黑气绕体',
  //   rarity: 'epic',
  //   shape: POOP_SHAPES.SPECIAL,
  //   emoji: '🖤💩',
  //   bgColor: '#1a1a1a',
  //   desc: '周身蒸腾着神秘黑气，不知是什么吃进肚子里了。背景有华丽的动态粒子缭绕。',
  //   trigger: '史诗概率随机',
  //   triggerFn: { type: 'random', rarity: 'epic' },
  // },
  // {
  //   id: 'holy_poop',
  //   name: '圣光加持',
  //   rarity: 'epic',
  //   shape: POOP_SHAPES.SPECIAL,
  //   emoji: '✨💩😇',
  //   bgColor: '#fffff0',
  //   desc: '背后有圣洁光环，这是上天的恩赐，也是肠胃的胜利。',
  //   trigger: '史诗概率随机',
  //   triggerFn: { type: 'random', rarity: 'epic' },
  // },
  // {
  //   id: 'cattle_horse',
  //   name: '牛马本马',
  //   rarity: 'epic',
  //   shape: POOP_SHAPES.SPECIAL,
  //   emoji: '🐴💩',
  //   bgColor: '#37474f',
  //   desc: '打工人拉给打工人的便便，散发着工牌的金属冷光，写着今日KPI已完成（假的）。',
  //   trigger: '史诗概率随机',
  //   triggerFn: { type: 'random', rarity: 'epic' },
  // },
  // {
  //   id: 'card_check',
  //   name: '我要验牌',
  //   rarity: 'epic',
  //   shape: POOP_SHAPES.SPECIAL,
  //   emoji: '🃏💩',
  //   bgColor: '#fff8dc',
  //   desc: '拉完后强烈怀疑这难道是真的吗？浑身散发着"我要验牌"的质疑金光，仿佛下一秒就要叫你给它擦皮鞋。',
  //   trigger: '史诗概率随机',
  //   triggerFn: { type: 'random', rarity: 'epic' },
  // },
  {
    id: 'shocking',
    name: '夯爆了',
    rarity: 'epic',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '🤯💩',
    image: POOP_IMAGE_MAP.shocking,
    bgColor: '#3e2723',
    desc: '场面过于震撼的杰作，大号结束整个人都不淡定了，连便便自己都被自己的气势怔住了。',
    trigger: '史诗概率随机',
    triggerFn: { type: 'random', rarity: 'epic' },
  },
  {
    id: 'circuit_gut',
    name: '你有高速运转的肠道',
    rarity: 'epic',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '⚡💩',
    image: POOP_IMAGE_MAP.circuit_gut,
    bgColor: '#1a237e',
    desc: '由一句语无伦次的互联网迷因催化，便便表面布满令人困惑的无意义电路图。',
    trigger: '史诗概率随机',
    triggerFn: { type: 'random', rarity: 'epic' },
  },
  {
    id: 'huaqiang_melon',
    name: '华强买瓜',
    rarity: 'epic',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '🍉💩',
    image: POOP_IMAGE_MAP.huaqiang_melon,
    bgColor: '#102a13',
    desc: '重新杀回互联网顶流的产物，开口问“这瓜保熟吗”时自带威慑力，气场比隔壁水果摊的西瓜还大。',
    trigger: '史诗概率随机',
    triggerFn: { type: 'random', rarity: 'epic' },
  },
  {
    id: 'classy_penguin',
    name: '高雅人士',
    rarity: 'epic',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '🐧💩',
    image: POOP_IMAGE_MAP.classy_penguin,
    bgColor: '#111111',
    desc: '外表大腹便便的企鹅同款便便，穿着燕尾服戴着墨镜，表情犀利毒舌，评论区霸屏王。',
    trigger: '史诗概率随机',
    triggerFn: { type: 'random', rarity: 'epic' },
  },
  {
    id: 'cyber_woodfish',
    name: '电子功德木鱼',
    rarity: 'epic',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '🪵💩🟩',
    image: POOP_IMAGE_MAP.cyber_woodfish,
    bgColor: '#0b1f12',
    desc: '边熬夜边在赛博佛祖面前刷KPI的产物，头顶像素木鱼若隐若现，嘴上说着“我不焦虑”。',
    trigger: '史诗概率随机',
    triggerFn: { type: 'random', rarity: 'epic' },
  },
  {
    id: 'sage_moment',
    name: '贤者时刻',
    rarity: 'epic',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '🪷💩',
    image: POOP_IMAGE_MAP.sage_moment,
    bgColor: '#ede7f6',
    desc: '拉完后突然顿悟人生真谛的产物，浑身散发着开悟的淡紫色智慧光，表情通透得像看穿了一切。',
    trigger: '史诗概率随机',
    triggerFn: { type: 'random', rarity: 'epic' },
  },
  {
    id: 'disenchanted',
    name: '祛魅成功',
    rarity: 'epic',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '🕊️💩',
    image: POOP_IMAGE_MAP.disenchanted,
    bgColor: '#fafafa',
    desc: '彻底想开后拉出来的便便，浑身散发着佛系的灰白光，表情平静如水，仿佛在说"不就是个便便么"。',
    trigger: '史诗概率随机',
    triggerFn: { type: 'random', rarity: 'epic' },
  },

  // ════════════════════════════════════════
  //  传说款（3 种）
  // ════════════════════════════════════════

  {
    id: 'streak_legend_1',
    name: '连击·破晓传说',
    rarity: 'legendary',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '🌟💩👑',
    image: POOP_IMAGE_MAP.streak_legend_1,
    bgColor: '#1a1a2e',
    desc: '专属连续打卡纪念款·第一阶。你已经连续打卡7天，成为如厕界冉冉升起的新星。',
    trigger: '连续打卡 7 天，传说池保底触发',
    triggerFn: { type: 'streak_pity', streakDays: 7 },
    specialEffect: 'particle_gold',
  },
  {
    id: 'streak_legend_2',
    name: '连击·燃烧传说',
    rarity: 'legendary',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '🔥💩👑',
    image: POOP_IMAGE_MAP.streak_legend_2,
    bgColor: '#0d0d0d',
    desc: '专属连续打卡纪念款·第二阶。你的肠道如同不灭之火，14天的坚守换来这炙热的荣耀。',
    trigger: '连续打卡 14 天，传说池保底触发',
    triggerFn: { type: 'streak_pity', streakDays: 14 },
    specialEffect: 'particle_fire',
  },
  {
    id: 'streak_legend_3',
    name: '连击·宇宙传说',
    rarity: 'legendary',
    shape: POOP_SHAPES.SPECIAL,
    emoji: '🌌💩👑',
    image: POOP_IMAGE_MAP.streak_legend_3,
    bgColor: '#000020',
    desc: '专属连续打卡纪念款·终极。30天，你与宇宙同频。这坨便便已经超越了如厕的范畴。',
    trigger: '连续打卡 30 天，传说池保底触发',
    triggerFn: { type: 'streak_pity', streakDays: 30 },
    specialEffect: 'particle_galaxy',
  },
];

// ============================================================
//  工具函数
// ============================================================

/** 根据 id 查找便便 */
export const findPoop = (id) => POOP_DATABASE.find(p => p.id === id);

/** 按稀有度筛选 */
export const filterByRarity = (rarity) =>
  rarity === 'all'
    ? POOP_DATABASE
    : POOP_DATABASE.filter(p => p.rarity === rarity);

/** 获取稀有度配置（合并便便自身的 bgColor 覆盖） */
export const getRarityConfig = (poop) => ({
  ...RARITY_CONFIG[poop.rarity],
  ...(poop.bgColor  ? { bgColor: poop.bgColor }   : {}),
  ...(poop.textColor ? { textColor: poop.textColor } : {}),
});

/** 图鉴总数 */
export const TOTAL_POOP_COUNT = POOP_DATABASE.length;
