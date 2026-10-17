# 风绘云盘 · Logo 套件

以工作区 `../assets/originals/Cloudrave/logo.svg` 的圆环、层叠色块和云朵为基础，融合工作区 `../assets/originals/miku.svg` 的双马尾角色。配色统一为青绿、深海蓝与少量粉色，角色手机中加入云朵图案。主图标人物坐在云层中部，并略向左调整以平衡画面，双马尾自然垂入云层。

完整角色版用于站点标识与品牌展示；小尺寸版简化为双马尾与粉色发饰，玩偶位于圆形正中央，底部不保留白色云朵，供 favicon 使用。所有 SVG 均为独立文件，中文名称已转为矢量路径，不依赖客户端字体；PNG 为透明背景。

彩色图标不区分深浅色背景。Logo 保留深色文字与浅色文字两套，共用同一枚彩色图标。单色文件为额外的印刷用途版本。

## 常用文件

| 文件 | 用途 / 尺寸 |
| --- | --- |
| `logo.svg` | 浅色背景横版，深色文字，1060 × 320 |
| `logo_light.svg` | 深色背景横版，浅色文字，1060 × 320 |
| `variants/logo-stacked.svg` | 浅色背景竖版，800 × 880 |
| `variants/logo-stacked-light.svg` | 深色背景竖版，800 × 880 |
| `icons/icon.svg` | 完整角色圆形图标，512 × 512 |
| `icons/icon-compact.svg` / `favicon.svg` | 居中的简化小玩偶，无底部云朵，512 × 512，可任意缩放 |
| `icons/icon-compact.png` | 简化小玩偶图标的透明 PNG，512 × 512 |
| `logo100.png` / `logo192.png` / `logo512.png` | 100 / 192 / 512 像素完整角色主图标 |
| `favicon.ico` | 内含 16 / 32 / 48 / 64 / 128 / 256 像素的小尺寸图标 |
| `icons/favicon-16x16.png` / `icons/favicon-32x32.png` | PNG 格式 favicon |
| `icons/apple-touch-icon.png` | 180 × 180，透明背景；系统可自动补背景 |
| `variants/wordmark.svg` / `variants/wordmark-light.svg` | 纯文字标志，深色 / 浅色 |
| `icons/icon-mono.svg` / `icons/icon-mono-white.svg` | 深色 / 白色单色图标，透明背景 |
| `variants/logo-mono.svg` | 深色单色横版标志 |
| `png/` | 横版、竖版、文字与单色标志的 1× / 2× PNG，以及 16–1024 像素图标 |
| `site.webmanifest` | 提供 192 / 512 图标与主题色的基础 manifest |
| `preview/preview.html` | 可在浏览器直接打开的总览与实际尺寸预览 |
| `preview/brand-overview.png` / `preview/brand-preview.svg` | 整套标志的预览图，1600 × 1240 |
| `preview/logo-preview-light.png` / `preview/logo-preview-dark.png` | 两套横版 Logo 的透明 PNG 预览 |
| `preview/logo-comparison.png` | 两套横版 Logo 的透明背景上下对照图 |
| `source/` | 两份原始 SVG 的副本、中文轮廓数据与生成脚本 |

## 使用建议

- 网站页头：浅色背景用 `logo.svg`，深色背景用 `logo_light.svg`。保持原始宽高比，建议显示高度不低于 40 px。
- 标签页：优先使用 `favicon.svg`，并以 `favicon.ico` 或 PNG 兼容其他浏览器。
- 头像与应用图标：100 px 主图标与 128 px 及以上尺寸使用完整角色版，其余低于 128 px 的尺寸使用简化版。`png/` 中各尺寸已按此规则导出。
- 竖版：建议显示宽度不低于 160 px。标志周围保留至少圆形图标直径 1/8 的留白。
- 单色版：用于印章、单色印刷与纯色展示。白色单色文件需置于深色背景。

常用文件沿用了原素材中的 `logo.svg`、`logo_light.svg`、`logo192.png`、`logo512.png`、`favicon.ico` 命名，方便在确认实际部署资源路径后对应使用。工作区原始素材未改动，本次仅生成本地资源。

静态网页引用示例（`/logo/` 请改为实际上传目录）：

```html
<link rel="icon" type="image/svg+xml" href="/logo/favicon.svg">
<link rel="icon" href="/logo/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/logo/icons/apple-touch-icon.png">
<link rel="manifest" href="/logo/site.webmanifest">
```

## 配色

| 颜色 | 色值 | 使用位置 |
| --- | --- | --- |
| 深海蓝 | `#163849` | 主文字、单色标识 |
| 云青 | `#198DA6` | 圆形背景主色 |
| 浅青绿 | `#8CC9CA` | 角色头发 |
| 樱粉 | `#EE8CA9` | 简化版发饰点缀 |
| 雾青 | `#D5EFF1` | 圆环与浅色背景 |

## 目录与交付

`cloudrave/` 是可直接用于 Cloudrave 的新版资源目录，按原件配齐 `logo.svg`、`logo_light.svg`、`logo192.png`、`logo512.png`、`favicon.ico` 五个文件。横版 Logo 为透明背景，并保留深色文字与浅色文字两套；PNG 为对应尺寸的完整角色图标，ICO 为简化玩偶图标。对应替换时使用此目录。工作区根目录的 `../cloudrave/` 为用户原件。

站点常用文件保留在本目录根部，其余按 `icons/`、`variants/`、`png/`、`preview/`、`source/` 分类。最新压缩包为 `../deliverables/fenghui-cloud-logo-kit.zip`。

## 源文件与重建

`source/miku-original.svg` 和 `source/cloudreve-original.svg` 为原始素材副本；`source/cloud-symbol-source.svg` 是从 Cloudreve 横版中提取的圆形图案。

`source/wordmark-path.json` 保存“风绘云盘”的字形轮廓；来自本机微软雅黑粗体，已转为路径。`source/build-wordmark.ps1` 可在有该字体的 Windows 环境重新提取。

`source/build.mjs` 使用 Node.js 与 Sharp 生成资源。交付 ZIP 的根目录包含 `package.json` 和 `package-lock.json`。先在项目根目录或 ZIP 解压根目录运行 `npm ci` 安装锁定的依赖，再执行以下重建命令：

```powershell
node .\logo\source\build.mjs
```

重建后运行 `python .\logo\source\package.py`，更新 `deliverables/` 中的交付包。

## 许可与来源

本项目中发布者有权许可的原创贡献采用 [CC BY-NC-SA 4.0](../LICENSE)。第三方角色、原始标志、字体软件及商标权仍由原权利人保留；范围与署名说明见 [NOTICE.md](../NOTICE.md)。交付压缩包会附带许可证与说明。
