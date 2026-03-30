# GrokVideo — xAI 影片生成器

部署在 Cloudflare Workers 的 Grok Video Generation 前端 + Proxy。

## 快速部署

```bash
npm install
npx wrangler login
npm run deploy
```

## 架構

```
Browser → CF Worker
  GET  /               → 前端 HTML
  POST /api/generate   → proxy → api.x.ai/v1/videos/generations
  GET  /api/status/:id → proxy → api.x.ai/v1/videos/generations/:id
```

## 支援模型

| 模型 | 說明 |
|------|------|
| `grok-video-normal` | 快速生成 |
| `grok-video-hd` | 高品質輸出 |

## 功能

- 🎬 影片生成（16:9 / 9:16 / 1:1 / 4:3，480p~1080p，3~10 秒）
- ⏳ 非同步輪詢狀態（每 5 秒，最長 10 分鐘）
- 📥 下載影片 / 複製連結
- 🕐 最近 20 筆生成記錄
- 🌓 深色 / 淺色模式
- 📱 響應式設計

## 注意

- API Key 不會傳送到任何第三方，僅用於直接呼叫 xAI API
- CF Workers 免費方案每天 100,000 次請求
