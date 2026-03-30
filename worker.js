// ============================================================
// Grok Video Generator — Cloudflare Worker
// API Proxy + Full SPA Frontend
// ============================================================

const HTML = `<!DOCTYPE html>
<html lang="zh-Hant" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Grok 影片生成器</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&display=swap" rel="stylesheet">
<style>
/* ── Design Tokens ── */
:root, [data-theme="light"] {
  --color-bg: #f7f6f2;
  --color-surface: #f9f8f5;
  --color-surface-2: #fbfbf9;
  --color-surface-offset: #f3f0ec;
  --color-surface-dynamic: #e6e4df;
  --color-divider: #dcd9d5;
  --color-border: #d4d1ca;
  --color-text: #28251d;
  --color-text-muted: #7a7974;
  --color-text-faint: #bab9b4;
  --color-text-inverse: #f9f8f4;
  --color-primary: #01696f;
  --color-primary-hover: #0c4e54;
  --color-primary-active: #0f3638;
  --color-primary-highlight: #cedcd8;
  --color-success: #437a22;
  --color-success-hover: #2e5c10;
  --color-success-highlight: #d4dfcc;
  --color-error: #a12c7b;
  --color-error-hover: #7d1e5e;
  --color-error-highlight: #e0ced7;
  --color-warning: #964219;
  --color-warning-highlight: #ddcfc6;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;
  --shadow-sm: 0 1px 2px oklch(0.2 0.01 80 / 0.06);
  --shadow-md: 0 4px 12px oklch(0.2 0.01 80 / 0.08);
  --shadow-lg: 0 12px 32px oklch(0.2 0.01 80 / 0.12);
  --space-1: 0.25rem; --space-2: 0.5rem; --space-3: 0.75rem;
  --space-4: 1rem; --space-5: 1.25rem; --space-6: 1.5rem;
  --space-8: 2rem; --space-10: 2.5rem; --space-12: 3rem;
  --space-16: 4rem; --space-20: 5rem;
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.75vw, 1.5rem);
  --text-xl: clamp(1.5rem, 1.2rem + 1.25vw, 2.25rem);
  --font-body: 'Inter', 'Helvetica Neue', sans-serif;
  --transition: 180ms cubic-bezier(0.16, 1, 0.3, 1);
  --content-narrow: 640px;
  --content-default: 960px;
}
[data-theme="dark"] {
  --color-bg: #0f0e0d;
  --color-surface: #161514;
  --color-surface-2: #1c1b19;
  --color-surface-offset: #1a1917;
  --color-surface-dynamic: #252422;
  --color-divider: #232220;
  --color-border: #323130;
  --color-text: #d4d3d1;
  --color-text-muted: #797876;
  --color-text-faint: #4a4948;
  --color-text-inverse: #1a1917;
  --color-primary: #4f98a3;
  --color-primary-hover: #3d8a95;
  --color-primary-active: #2d7580;
  --color-primary-highlight: #1e3236;
  --color-success: #6daa45;
  --color-success-hover: #5a9435;
  --color-success-highlight: #1c2e14;
  --color-error: #d163a7;
  --color-error-hover: #c04c95;
  --color-error-highlight: #2d1425;
  --color-warning: #bb653b;
  --color-warning-highlight: #2a1a0e;
  --shadow-sm: 0 1px 2px oklch(0 0 0 / 0.3);
  --shadow-md: 0 4px 12px oklch(0 0 0 / 0.4);
  --shadow-lg: 0 12px 32px oklch(0 0 0 / 0.5);
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --color-bg: #0f0e0d; --color-surface: #161514; --color-surface-2: #1c1b19;
    --color-surface-offset: #1a1917; --color-surface-dynamic: #252422;
    --color-divider: #232220; --color-border: #323130;
    --color-text: #d4d3d1; --color-text-muted: #797876; --color-text-faint: #4a4948;
    --color-text-inverse: #1a1917; --color-primary: #4f98a3;
    --color-primary-hover: #3d8a95; --color-primary-active: #2d7580;
    --color-primary-highlight: #1e3236; --color-success: #6daa45;
    --color-success-highlight: #1c2e14; --color-error: #d163a7;
    --color-error-highlight: #2d1425; --color-warning: #bb653b;
    --color-warning-highlight: #2a1a0e;
    --shadow-sm: 0 1px 2px oklch(0 0 0 / 0.3);
    --shadow-md: 0 4px 12px oklch(0 0 0 / 0.4);
    --shadow-lg: 0 12px 32px oklch(0 0 0 / 0.5);
  }
}

/* ── Base Reset ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html {
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  scroll-behavior: smooth;
}
body {
  min-height: 100dvh;
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.6;
}
img, video { display: block; max-width: 100%; height: auto; }
input, button, textarea, select { font: inherit; color: inherit; }
button { cursor: pointer; background: none; border: none; }
h1, h2, h3, h4 { text-wrap: balance; line-height: 1.2; }
a, button, input, textarea, select {
  transition: color var(--transition), background var(--transition),
    border-color var(--transition), box-shadow var(--transition), opacity var(--transition);
}
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}
::selection { background: oklch(from var(--color-primary) l c h / 0.25); }
.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border-width: 0;
}

/* ── Layout ── */
.app-layout {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100dvh;
}
.container {
  max-width: var(--content-default);
  margin-inline: auto;
  padding-inline: var(--space-4);
}
.container--narrow {
  max-width: var(--content-narrow);
  margin-inline: auto;
  padding-inline: var(--space-4);
}

/* ── Header ── */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: oklch(from var(--color-bg) l c h / 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-divider);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: var(--space-4);
}
.logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  color: var(--color-text);
}
.logo-mark {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}
.logo-text {
  font-size: var(--text-base);
  font-weight: 600;
  letter-spacing: -0.01em;
}
.logo-text span { color: var(--color-primary); }
.header-actions { display: flex; align-items: center; gap: var(--space-3); }
.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  border: 1px solid transparent;
}
.btn-icon:hover {
  background: var(--color-surface-offset);
  color: var(--color-text);
  border-color: var(--color-border);
}

/* ── Main Content ── */
.main-content {
  padding-block: var(--space-10) var(--space-16);
}

/* ── API Key Setup ── */
.api-key-banner {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  margin-bottom: var(--space-8);
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
}
.api-key-banner.hidden { display: none; }
.banner-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: var(--color-warning);
  margin-top: 2px;
}
.banner-body { flex: 1; }
.banner-title {
  font-size: var(--text-sm);
  font-weight: 600;
  margin-bottom: var(--space-3);
}
.api-key-row {
  display: flex;
  gap: var(--space-2);
}
.api-key-row input {
  flex: 1;
  height: 38px;
  padding: 0 var(--space-3);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--color-text);
  font-family: 'SFMono-Regular', 'Consolas', monospace;
  font-size: 0.8rem;
  letter-spacing: 0.03em;
}
.api-key-row input:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 3px oklch(from var(--color-primary) l c h / 0.15);
}

/* ── Generate Form ── */
.gen-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  margin-bottom: var(--space-8);
  box-shadow: var(--shadow-sm);
}
.gen-card h2 {
  font-size: var(--text-lg);
  font-weight: 600;
  margin-bottom: var(--space-6);
  letter-spacing: -0.02em;
}
.form-grid {
  display: grid;
  gap: var(--space-5);
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--space-4);
}
@media (max-width: 640px) {
  .form-row { grid-template-columns: 1fr; }
}
.form-group { display: flex; flex-direction: column; gap: var(--space-2); }
.form-label {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.form-control {
  height: 42px;
  padding: 0 var(--space-3);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--color-text);
  width: 100%;
  appearance: none;
  -webkit-appearance: none;
}
.form-control:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 3px oklch(from var(--color-primary) l c h / 0.15);
}
.form-control:hover:not(:focus) { border-color: oklch(from var(--color-border) l c h / 0.8); }
select.form-control {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23797876' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-3) center;
  padding-right: var(--space-8);
  cursor: pointer;
}
.prompt-group { display: flex; flex-direction: column; gap: var(--space-2); }
.prompt-area {
  min-height: 100px;
  padding: var(--space-3);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--color-text);
  resize: vertical;
  line-height: 1.6;
  width: 100%;
  font-family: var(--font-body);
}
.prompt-area:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 3px oklch(from var(--color-primary) l c h / 0.15);
}
.prompt-area::placeholder { color: var(--color-text-faint); }
.prompt-examples {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-1);
}
.example-chip {
  font-size: var(--text-xs);
  padding: var(--space-1) var(--space-3);
  background: var(--color-surface-offset);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  color: var(--color-text-muted);
  cursor: pointer;
  white-space: nowrap;
  transition: background var(--transition), color var(--transition), border-color var(--transition);
}
.example-chip:hover {
  background: var(--color-primary-highlight);
  color: var(--color-primary);
  border-color: var(--color-primary);
}
.generate-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  height: 48px;
  padding: 0 var(--space-8);
  background: var(--color-primary);
  color: var(--color-text-inverse);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.01em;
  width: 100%;
  margin-top: var(--space-2);
}
.generate-btn:hover:not(:disabled) { background: var(--color-primary-hover); }
.generate-btn:active:not(:disabled) { background: var(--color-primary-active); }
.generate-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid oklch(from var(--color-text-inverse) l c h / 0.3);
  border-top-color: var(--color-text-inverse);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: none;
}
.generate-btn.loading .btn-spinner { display: block; }
.generate-btn.loading .btn-text { display: none; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Status Panel ── */
.status-panel {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  margin-bottom: var(--space-8);
  display: none;
}
.status-panel.visible { display: block; }
.status-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}
.status-title {
  font-size: var(--text-sm);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-primary);
  animation: pulse 1.5s ease-in-out infinite;
}
.status-dot.done { background: var(--color-success); animation: none; }
.status-dot.error { background: var(--color-error); animation: none; }
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}
.status-id {
  font-size: var(--text-xs);
  color: var(--color-text-faint);
  font-family: monospace;
}
.progress-bar-track {
  height: 4px;
  background: var(--color-surface-dynamic);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: var(--space-3);
}
.progress-bar-fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: var(--radius-full);
  transition: width 0.6s ease;
  width: 0%;
}
.status-message {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

/* ── Result ── */
.result-panel {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin-bottom: var(--space-8);
  display: none;
  box-shadow: var(--shadow-md);
}
.result-panel.visible { display: block; }
.result-video-wrap {
  background: #000;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.result-video-wrap.portrait { aspect-ratio: 9/16; }
.result-video-wrap.square { aspect-ratio: 1; }
.result-video-wrap.landscape43 { aspect-ratio: 4/3; }
.result-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.result-meta {
  padding: var(--space-4) var(--space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--color-divider);
  gap: var(--space-4);
  flex-wrap: wrap;
}
.result-prompt {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.result-actions {
  display: flex;
  gap: var(--space-2);
  flex-shrink: 0;
}
.btn-sm {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  height: 34px;
  padding: 0 var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  font-weight: 500;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  background: var(--color-bg);
}
.btn-sm:hover { background: var(--color-surface-offset); color: var(--color-text); border-color: oklch(from var(--color-border) l c h / 0.8); }
.btn-sm.primary {
  background: var(--color-primary);
  color: var(--color-text-inverse);
  border-color: transparent;
}
.btn-sm.primary:hover { background: var(--color-primary-hover); }

/* ── Error Alert ── */
.error-alert {
  background: var(--color-error-highlight);
  border: 1px solid oklch(from var(--color-error) l c h / 0.3);
  border-radius: var(--radius-lg);
  padding: var(--space-4) var(--space-5);
  margin-bottom: var(--space-6);
  display: none;
  font-size: var(--text-sm);
  color: var(--color-error);
  gap: var(--space-3);
  align-items: flex-start;
}
.error-alert.visible { display: flex; }
.error-alert svg { flex-shrink: 0; margin-top: 2px; }

/* ── History ── */
.history-section h3 {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: var(--space-4);
}
.history-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(180px, 100%), 1fr));
  gap: var(--space-3);
}
.history-item {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow var(--transition), border-color var(--transition);
}
.history-item:hover {
  box-shadow: var(--shadow-md);
  border-color: oklch(from var(--color-primary) l c h / 0.4);
}
.history-thumb {
  aspect-ratio: 16/9;
  background: var(--color-surface-dynamic);
  position: relative;
  overflow: hidden;
}
.history-thumb video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.history-thumb-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-faint);
}
.history-info {
  padding: var(--space-3);
}
.history-prompt {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: var(--space-1);
}
.history-meta {
  font-size: var(--text-xs);
  color: var(--color-text-faint);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.history-status {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px var(--space-2);
  border-radius: var(--radius-full);
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.history-status.done {
  background: var(--color-success-highlight);
  color: var(--color-success);
}
.history-status.pending {
  background: var(--color-primary-highlight);
  color: var(--color-primary);
}
.history-status.error {
  background: var(--color-error-highlight);
  color: var(--color-error);
}
.empty-history {
  grid-column: 1 / -1;
  text-align: center;
  padding: var(--space-10) var(--space-4);
  color: var(--color-text-faint);
  font-size: var(--text-sm);
}

/* ── Toast ── */
.toast-container {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  pointer-events: none;
}
.toast {
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-xs);
  box-shadow: var(--shadow-lg);
  transform: translateX(120%);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: auto;
  max-width: 280px;
}
.toast.show { transform: translateX(0); }
.toast.success { border-color: oklch(from var(--color-success) l c h / 0.4); }
.toast.error { border-color: oklch(from var(--color-error) l c h / 0.4); }

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--color-text-faint); }

/* ── Shimmer loader ── */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg,
    var(--color-surface-offset) 25%,
    var(--color-surface-dynamic) 50%,
    var(--color-surface-offset) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: var(--radius-sm);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
</head>
<body>
<a href="#main" class="sr-only">跳至主要內容</a>

<div class="app-layout">
  <!-- Header -->
  <header class="site-header">
    <div class="container">
      <div class="header-inner">
        <a href="/" class="logo" aria-label="Grok 影片生成器首頁">
          <svg class="logo-mark" aria-hidden="true" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="currentColor" opacity="0.08"/>
            <path d="M8 16 L14 10 L20 16 L14 22 Z" fill="none" stroke="var(--color-primary)" stroke-width="1.5"/>
            <path d="M14 10 L22 10 L22 22" stroke="var(--color-primary)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            <circle cx="22" cy="16" r="2" fill="var(--color-primary)"/>
          </svg>
          <span class="logo-text">Grok <span>影片</span></span>
        </a>
        <div class="header-actions">
          <button class="btn-icon" id="themeToggle" aria-label="切換深色模式" data-theme-toggle>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Main -->
  <main id="main" class="main-content">
    <div class="container--narrow">

      <!-- API Key Banner -->
      <div class="api-key-banner" id="apiKeyBanner">
        <svg class="banner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <div class="banner-body">
          <p class="banner-title">設定 xAI API Key</p>
          <div class="api-key-row">
            <input type="password" id="apiKeyInput" placeholder="xai-..." autocomplete="off" aria-label="xAI API Key">
            <button class="btn-sm primary" id="saveApiKeyBtn">儲存</button>
            <button class="btn-sm" id="clearApiKeyBtn" style="display:none">清除</button>
          </div>
        </div>
      </div>

      <!-- Error Alert -->
      <div class="error-alert" id="errorAlert" role="alert">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span id="errorMsg"></span>
      </div>

      <!-- Generator Form -->
      <div class="gen-card">
        <h2>生成影片</h2>
        <div class="form-grid">

          <!-- Prompt -->
          <div class="prompt-group">
            <label class="form-label" for="promptInput">提示詞</label>
            <textarea class="prompt-area" id="promptInput" placeholder="描述你想要生成的影片內容，越詳細越好..." rows="4" aria-required="true"></textarea>
            <div class="prompt-examples" role="list" aria-label="提示詞範例">
              <button class="example-chip" role="listitem">🌿 陽光花園中漫步的貓</button>
              <button class="example-chip" role="listitem">🌊 日落時分的海浪</button>
              <button class="example-chip" role="listitem">🏙️ 賽博朋克城市夜景</button>
              <button class="example-chip" role="listitem">🐉 飛翔的中國龍</button>
              <button class="example-chip" role="listitem">⛩️ 日式庭院瀑布</button>
              <button class="example-chip" role="listitem">🌌 星空下的山脈縮時</button>
            </div>
          </div>

          <!-- Options Row -->
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="modelSelect">模型</label>
              <select class="form-control" id="modelSelect">
                <option value="grok-video-normal">grok-video-normal（快速）</option>
                <option value="grok-video-hd">grok-video-hd（高畫質）</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="aspectSelect">比例</label>
              <select class="form-control" id="aspectSelect">
                <option value="16:9">16:9 橫向</option>
                <option value="9:16">9:16 直向</option>
                <option value="1:1">1:1 正方</option>
                <option value="4:3">4:3 標準</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="durationSelect">時長（秒）</label>
              <select class="form-control" id="durationSelect">
                <option value="3">3 秒</option>
                <option value="5" selected>5 秒</option>
                <option value="7">7 秒</option>
                <option value="10">10 秒</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="resolutionSelect">解析度</label>
              <select class="form-control" id="resolutionSelect">
                <option value="480p">480p</option>
                <option value="720p" selected>720p</option>
                <option value="1080p">1080p</option>
              </select>
            </div>
            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" for="negativeInput">負向提示詞（選填）</label>
              <input type="text" class="form-control" id="negativeInput" placeholder="不希望出現的內容...">
            </div>
          </div>

          <button class="generate-btn" id="generateBtn">
            <span class="btn-spinner" aria-hidden="true"></span>
            <span class="btn-text">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:6px" aria-hidden="true">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              開始生成
            </span>
          </button>
        </div>
      </div>

      <!-- Status Panel -->
      <div class="status-panel" id="statusPanel">
        <div class="status-header">
          <div class="status-title">
            <div class="status-dot" id="statusDot"></div>
            <span id="statusText">正在提交任務...</span>
          </div>
          <span class="status-id" id="statusId"></span>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" id="progressBar"></div>
        </div>
        <p class="status-message" id="statusMessage">請稍候，影片生成需要 1–5 分鐘</p>
      </div>

      <!-- Result Panel -->
      <div class="result-panel" id="resultPanel">
        <div class="result-video-wrap" id="resultVideoWrap">
          <video class="result-video" id="resultVideo" controls playsinline></video>
        </div>
        <div class="result-meta">
          <p class="result-prompt" id="resultPrompt"></p>
          <div class="result-actions">
            <button class="btn-sm" id="copyLinkBtn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              複製連結
            </button>
            <a class="btn-sm primary" id="downloadBtn" download="grok-video.mp4" target="_blank" rel="noopener">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              下載影片
            </a>
          </div>
        </div>
      </div>

      <!-- History -->
      <section class="history-section" aria-label="生成記錄">
        <h3>最近記錄</h3>
        <div class="history-grid" id="historyGrid">
          <div class="empty-history">尚無生成記錄</div>
        </div>
      </section>

    </div>
  </main>
</div>

<!-- Toast Container -->
<div class="toast-container" id="toastContainer" aria-live="polite" aria-atomic="true"></div>

<script>
(function() {
'use strict';

// ── Theme Toggle ──
const html = document.documentElement;
const themeBtn = document.querySelector('[data-theme-toggle]');
let currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon();

function updateThemeIcon() {
  if (!themeBtn) return;
  themeBtn.innerHTML = currentTheme === 'dark'
    ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
    : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  themeBtn.setAttribute('aria-label', currentTheme === 'dark' ? '切換淺色模式' : '切換深色模式');
}

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
  });
}

// ── State ──
let apiKey = '';
let history = [];
let currentJobId = null;
let pollTimer = null;
let pollProgress = 0;

// ── Elements ──
const apiKeyBanner  = document.getElementById('apiKeyBanner');
const apiKeyInput   = document.getElementById('apiKeyInput');
const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
const clearApiKeyBtn= document.getElementById('clearApiKeyBtn');
const generateBtn   = document.getElementById('generateBtn');
const promptInput   = document.getElementById('promptInput');
const modelSelect   = document.getElementById('modelSelect');
const aspectSelect  = document.getElementById('aspectSelect');
const durationSelect= document.getElementById('durationSelect');
const resolutionSelect = document.getElementById('resolutionSelect');
const negativeInput = document.getElementById('negativeInput');
const statusPanel   = document.getElementById('statusPanel');
const statusDot     = document.getElementById('statusDot');
const statusText    = document.getElementById('statusText');
const statusId      = document.getElementById('statusId');
const progressBar   = document.getElementById('progressBar');
const statusMessage = document.getElementById('statusMessage');
const resultPanel   = document.getElementById('resultPanel');
const resultVideoWrap = document.getElementById('resultVideoWrap');
const resultVideo   = document.getElementById('resultVideo');
const resultPrompt  = document.getElementById('resultPrompt');
const copyLinkBtn   = document.getElementById('copyLinkBtn');
const downloadBtn   = document.getElementById('downloadBtn');
const errorAlert    = document.getElementById('errorAlert');
const errorMsg      = document.getElementById('errorMsg');
const historyGrid   = document.getElementById('historyGrid');

// ── API Key ──
function setApiKey(key) {
  apiKey = key.trim();
  if (apiKey) {
    apiKeyBanner.classList.add('hidden');
    clearApiKeyBtn.style.display = 'inline-flex';
    saveApiKeyBtn.textContent = '已儲存 ✓';
    setTimeout(() => { saveApiKeyBtn.textContent = '儲存'; }, 2000);
  }
}

saveApiKeyBtn.addEventListener('click', () => {
  const val = apiKeyInput.value.trim();
  if (!val) { showError('請輸入 API Key'); return; }
  if (!val.startsWith('xai-')) { showError('API Key 格式不正確，應以 xai- 開頭'); return; }
  setApiKey(val);
  showToast('API Key 已儲存（僅保存於記憶體中）', 'success');
});

clearApiKeyBtn.addEventListener('click', () => {
  apiKey = '';
  apiKeyInput.value = '';
  apiKeyBanner.classList.remove('hidden');
  clearApiKeyBtn.style.display = 'none';
  showToast('API Key 已清除');
});

apiKeyInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') saveApiKeyBtn.click();
});

// ── Prompt Examples ──
document.querySelectorAll('.example-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const text = chip.textContent.replace(/^[^\w\u4e00-\u9fff]+/, '').trim();
    promptInput.value = text;
    promptInput.focus();
  });
});

// ── Error / Toast ──
function showError(msg) {
  errorMsg.textContent = msg;
  errorAlert.classList.add('visible');
  errorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function clearError() {
  errorAlert.classList.remove('visible');
}

function showToast(message, type = 'default') {
  const t = document.createElement('div');
  t.className = \`toast \${type}\`;
  t.textContent = message;
  document.getElementById('toastContainer').appendChild(t);
  requestAnimationFrame(() => { requestAnimationFrame(() => { t.classList.add('show'); }); });
  setTimeout(() => {
    t.classList.remove('show');
    t.addEventListener('transitionend', () => t.remove(), { once: true });
  }, 3000);
}

// ── Generate ──
generateBtn.addEventListener('click', async () => {
  clearError();
  const prompt = promptInput.value.trim();
  if (!prompt) { showError('請輸入提示詞'); promptInput.focus(); return; }
  if (!apiKey) { showError('請先儲存 API Key'); apiKeyInput.focus(); return; }

  setLoading(true);
  hideResult();
  showStatus('正在提交任務...', 0);

  const payload = {
    model: modelSelect.value,
    prompt,
    duration: parseInt(durationSelect.value),
    aspect_ratio: aspectSelect.value,
    resolution: resolutionSelect.value,
  };
  if (negativeInput.value.trim()) {
    payload.negative_prompt = negativeInput.value.trim();
  }

  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || \`HTTP \${res.status}\`);
    }

    const jobId = data.id || data.generation_id || data.request_id;
    if (!jobId) throw new Error('未收到任務 ID，請檢查 API 回應');

    currentJobId = jobId;
    const historyEntry = {
      id: jobId,
      prompt,
      model: modelSelect.value,
      aspect: aspectSelect.value,
      status: 'pending',
      videoUrl: null,
      ts: Date.now(),
    };
    history.unshift(historyEntry);
    if (history.length > 20) history.pop();
    renderHistory();

    statusId.textContent = \`ID: \${jobId.slice(0,12)}...\`;
    showStatus('任務已提交，等待生成中...', 5);
    startPolling(jobId, historyEntry);

  } catch (err) {
    setLoading(false);
    hideStatus();
    showError('生成失敗：' + err.message);
  }
});

function setLoading(on) {
  generateBtn.disabled = on;
  generateBtn.classList.toggle('loading', on);
}

// ── Status UI ──
function showStatus(text, progress) {
  statusPanel.classList.add('visible');
  statusText.textContent = text;
  progressBar.style.width = progress + '%';
  statusDot.className = 'status-dot';
}
function hideStatus() {
  statusPanel.classList.remove('visible');
}
function updateStatus(text, progress, state = 'pending') {
  statusText.textContent = text;
  progressBar.style.width = progress + '%';
  statusDot.className = 'status-dot ' + (state === 'done' ? 'done' : state === 'error' ? 'error' : '');
}

// ── Polling ──
function startPolling(jobId, historyEntry) {
  pollProgress = 10;
  let elapsed = 0;
  const maxWait = 600; // 10 min

  function tick() {
    if (elapsed >= maxWait) {
      clearTimeout(pollTimer);
      setLoading(false);
      updateStatus('生成超時，請稍後重試', 0, 'error');
      historyEntry.status = 'error';
      renderHistory();
      showError('生成超時（超過 10 分鐘）。影片可能仍在生成中，請直接查看 xAI 主控台。');
      return;
    }

    // progress simulation: accelerate towards 90% then slow
    if (pollProgress < 45) pollProgress += 3;
    else if (pollProgress < 75) pollProgress += 1.5;
    else if (pollProgress < 90) pollProgress += 0.5;

    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    updateStatus(
      \`生成中... \${mins > 0 ? mins + 'm ' : ''}\${secs}s\`,
      Math.min(pollProgress, 90)
    );

    fetch(\`/api/status/\${encodeURIComponent(jobId)}\`, {
      headers: { 'X-API-Key': apiKey },
    })
    .then(r => r.json())
    .then(data => {
      const st = data.status || data.state || '';
      const videoUrl = data.video_url || data.url || data.output?.url || data.result?.video_url || '';

      if (st === 'succeeded' || st === 'completed' || st === 'done' || videoUrl) {
        clearTimeout(pollTimer);
        setLoading(false);
        updateStatus('生成完成！', 100, 'done');
        historyEntry.status = 'done';
        historyEntry.videoUrl = videoUrl;
        renderHistory();
        showResult(videoUrl, historyEntry.prompt, historyEntry.aspect);
        setTimeout(hideStatus, 2000);
        showToast('🎉 影片生成完成！', 'success');
        return;
      }

      if (st === 'failed' || st === 'error') {
        clearTimeout(pollTimer);
        setLoading(false);
        const errMsg = data.error || data.message || '生成失敗';
        updateStatus('生成失敗', 0, 'error');
        historyEntry.status = 'error';
        renderHistory();
        showError('生成失敗：' + errMsg);
        return;
      }

      elapsed += 5;
      pollTimer = setTimeout(tick, 5000);
    })
    .catch(() => {
      elapsed += 5;
      pollTimer = setTimeout(tick, 5000);
    });
  }

  pollTimer = setTimeout(tick, 3000);
}

// ── Result ──
function showResult(videoUrl, prompt, aspect) {
  resultVideoWrap.className = 'result-video-wrap';
  if (aspect === '9:16') resultVideoWrap.classList.add('portrait');
  else if (aspect === '1:1') resultVideoWrap.classList.add('square');
  else if (aspect === '4:3') resultVideoWrap.classList.add('landscape43');

  resultVideo.src = videoUrl;
  resultPrompt.textContent = prompt;
  downloadBtn.href = videoUrl;
  resultPanel.classList.add('visible');
  resultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function hideResult() {
  resultPanel.classList.remove('visible');
  resultVideo.src = '';
}

// ── Copy Link ──
copyLinkBtn.addEventListener('click', () => {
  const url = resultVideo.src;
  if (!url) return;
  navigator.clipboard.writeText(url).then(() => {
    showToast('連結已複製到剪貼簿', 'success');
  }).catch(() => {
    showToast('複製失敗，請手動複製');
  });
});

// ── History ──
function renderHistory() {
  if (history.length === 0) {
    historyGrid.innerHTML = '<div class="empty-history">尚無生成記錄</div>';
    return;
  }
  historyGrid.innerHTML = history.map((item, idx) => \`
    <div class="history-item" role="button" tabindex="0"
         aria-label="\${item.prompt}"
         data-index="\${idx}">
      <div class="history-thumb">
        \${item.videoUrl
          ? \`<video src="\${item.videoUrl}" muted playsinline preload="metadata" aria-hidden="true"></video>\`
          : \`<div class="history-thumb-placeholder" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </div>\`
        }
      </div>
      <div class="history-info">
        <p class="history-prompt" title="\${item.prompt}">\${item.prompt}</p>
        <div class="history-meta">
          <span class="history-status \${item.status}">
            \${item.status === 'done' ? '完成' : item.status === 'error' ? '失敗' : '生成中'}
          </span>
          <span>\${item.model.replace('grok-video-', '')}</span>
        </div>
      </div>
    </div>
  \`).join('');

  historyGrid.querySelectorAll('.history-item').forEach(el => {
    const activate = () => {
      const idx = parseInt(el.dataset.index);
      const item = history[idx];
      if (item.videoUrl) showResult(item.videoUrl, item.prompt, item.aspect);
      else showToast('此影片尚未生成完成');
    };
    el.addEventListener('click', activate);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); } });
  });
}

renderHistory();

})();
</script>
</body>
</html>`;

// ============================================================
// API Proxy Handlers
// ============================================================

async function handleGenerate(request) {
  const apiKey = request.headers.get('X-API-Key');
  if (!apiKey) {
    return jsonResponse({ error: 'Missing X-API-Key header' }, 401);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  if (!body.prompt) {
    return jsonResponse({ error: 'prompt is required' }, 400);
  }

  const payload = {
    model: body.model || 'grok-video-normal',
    prompt: body.prompt,
    duration: body.duration || 5,
    aspect_ratio: body.aspect_ratio || '16:9',
    resolution: body.resolution || '720p',
  };
  if (body.negative_prompt) payload.negative_prompt = body.negative_prompt;

  try {
    const res = await fetch('https://api.x.ai/v1/videos/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(30000),
    });

    const data = await res.json();

    if (!res.ok) {
      return jsonResponse({
        error: data.error?.message || data.message || `xAI API error ${res.status}`,
        detail: data,
      }, res.status);
    }

    return jsonResponse(data, 200);
  } catch (err) {
    if (err.name === 'TimeoutError') {
      return jsonResponse({ error: 'Request to xAI API timed out' }, 504);
    }
    return jsonResponse({ error: err.message }, 502);
  }
}

async function handleStatus(request, jobId) {
  const apiKey = request.headers.get('X-API-Key');
  if (!apiKey) {
    return jsonResponse({ error: 'Missing X-API-Key header' }, 401);
  }

  if (!jobId) {
    return jsonResponse({ error: 'Missing job ID' }, 400);
  }

  try {
    const res = await fetch(`https://api.x.ai/v1/videos/generations/${encodeURIComponent(jobId)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(15000),
    });

    const data = await res.json();

    if (!res.ok) {
      return jsonResponse({
        error: data.error?.message || data.message || `xAI API error ${res.status}`,
        detail: data,
      }, res.status);
    }

    return jsonResponse(data, 200);
  } catch (err) {
    if (err.name === 'TimeoutError') {
      return jsonResponse({ error: 'Status check timed out' }, 504);
    }
    return jsonResponse({ error: err.message }, 502);
  }
}

// ============================================================
// Router
// ============================================================

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
    },
  });
}

function htmlResponse(body) {
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // API Routes
    if (path === '/api/generate' && method === 'POST') {
      return handleGenerate(request);
    }

    const statusMatch = path.match(/^\/api\/status\/(.+)$/);
    if (statusMatch && method === 'GET') {
      return handleStatus(request, decodeURIComponent(statusMatch[1]));
    }

    // Health check
    if (path === '/api/health') {
      return jsonResponse({ ok: true, ts: Date.now() });
    }

    // Frontend SPA (all other routes)
    return htmlResponse(HTML);
  },
};
