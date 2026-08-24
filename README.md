# 🚽 PooDiary · 便便日记

> **每一次排空，都是身体的温柔对话。**
> PooDiary 是一款以肠道健康为切入口的趣味打卡 Web App，通过游戏化收集与数据记录，帮你建立规律如厕的好习惯。

<p align="center">
  <img src="./assets/screenshot-home.png" alt="首页" width="258">
    
  <img src="./assets/screenshot-atlas.png" alt="图鉴" width="258">
    
  <img src="./assets/screenshot-drop-result.png" alt="便便掉落时刻" width="258">
</p>

---

## ✨ 功能亮点

### 🕐 计时打卡

一键开始 / 结束，记录每次便便时长。每次打卡都会积累积分，连续打卡更可解锁高级积分池，获取稀有便便。

<p align="center">
  <img src="./assets/screenshot-scene.png" alt="计时场景" width="400">
</p>

### 💩 60+ 种便便收集

从「普通硬球」到「传说的黄金之辉」，5 种稀有度、超过 60 种独具个性的便便等待你解锁。每种便便都有独特的像素立绘和场景描述。

| 稀有度  | 数量   | 风格           |
| ------- | ------ | -------------- |
| 🟤 普通 | 30+ 种 | 日常人间百态   |
| 🔵 稀有 | 10+ 种 | 打工人摸鱼实录 |
| 🟣 史诗 | 数种   | 哲思时刻       |
| 🟡 传说 | 限定   | 金色传说       |
| ⚪ 神秘 | 特殊   | 未知？？？     |

### 🎁 掉落时刻

每次结束计时都会触发一段华丽的掉落动画——神秘盒子摇晃、迸裂、粒子四散，然后展示你获得的便便！

<p align="center">
  <img src="./assets/screenshot-drop-result.png" alt="便便掉落结果" width="400">
</p>

### 📖 便便图鉴

收集到的便便会被收录进图鉴，支持按稀有度筛选，点击可查看详细信息。全收集是你的终极目标！

<p align="center">
  <img src="./assets/screenshot-atlas.png" alt="图鉴网格" width="400">
</p>

### 📅 日历记录

以日历视图清晰展示每月的打卡记录，每天的状态一目了然。支持查看详细历史。

<p align="center">
  <img src="./assets/screenshot-records.png" alt="日历与记录" width="400">
</p>

### 📊 每周便报

自动生成一周排便数据报告：

- 总次数 & 总时长
- 平均时长 & 最速 / 最慢记录
- 最常见地点 & 心情
- 连续打卡天数

### 🔥 连续打卡 & 积分池

- 连续打卡天数越高，解锁更高级的积分池（新手池 → 进阶池 → 传说池）
- 每次打卡随机获得便便，稀有度随积分池提升
- 特殊天气 / 时段触发隐藏加成

### 🌤️ 天气联动

支持 6 种天气状态（晴天 / 多云 / 阴天 / 大风 / 雨天 / 雷雨），雨天和雷雨会影响便便掉落概率。

### 🎵 背景音乐

内置多首 BGM，伴随你的每次如厕时光。

---

## 🛠️ 技术栈

| 层     | 技术                        |
| ------ | --------------------------- |
| 前端   | 原生 JavaScript (ES Module) |
| 样式   | 纯 CSS (无框架)             |
| 存储   | localStorage (持久化)       |
| 构建   | 无需构建，直接运行          |
| 服务端 | PowerShell 简易 HTTP 服务器 |
| 设计   | 像素风 UI + 手绘风素材      |

---

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/your-username/poopmart.git
cd poopmart

# Windows —— 用 PowerShell 启动
./server.ps1
# 打开 http://localhost:8091

# macOS / Linux —— 用 Python 启动
python3 -m http.server 8091
# 或
./start.sh
```

> 无需安装依赖，纯静态页面，开箱即用。

---

## 📁 项目结构

```
poopmart/
├── index.html              # 主入口
├── css/
│   └── styles.css          # 全部样式
├── src/
│   ├── app.js              # 应用入口 & 模块组装
│   ├── config.js           # 配置（鼓励语、天气、积分池）
│   ├── storage.js          # localStorage 封装
│   ├── banner.js           # 顶部横幅组件
│   ├── drop.js             # 便便掉落动画 & 结算
│   ├── draw.js             # 抽卡动画
│   ├── poster.js           # 周报海报生成
│   ├── records.js          # 日历 & 记录管理
│   ├── atlas.js            # 图鉴系统
│   ├── settings.js         # 设置面板
│   ├── toast.js            # Toast 提示
│   ├── tabs.js             # 底部标签切换
│   ├── utils.js            # 工具函数
│   └── poopDatabase.js     # 60+ 便便数据 & 稀有度配置
├── assets/
│   ├── character.png       # 场景角色
│   ├── picture/
│   │   ├── start.png       # 开始按钮
│   │   └── end.png         # 结束按钮
│   └── poop_assets/        # 60+ 像素便便图片
├── server.ps1              # PowerShell 服务器
└── start.sh                # Linux/macOS 启动脚本
```

---

## 💡 设计理念

肠道健康是整体健康的晴雨表。**PooDiary** 希望用轻松、幽默的方式，帮你：

- 🧘 **建立身体觉知** — 关注排便规律，及早发现异常
- 🎮 **降低坚持门槛** — 游戏化机制让打卡变得有趣
- 📈 **看见进步轨迹** — 数据可视化让你直观感受变化
- 😄 **卸下羞耻感** — 用像素风和幽默感化解话题尴尬

> **健康，从认真面对每一次「排空」开始。**

---

## 📝 License

Copyright © 2025–2026 Grred.

This project is available for personal, educational, and non-commercial use only.
Commercial use, resale, redistribution, or incorporation into a commercial product
requires prior written permission from the author.

The PooDiary name, logo, visual identity, and original artwork are reserved and may
not be reused without permission.
