# pan icon · 项目协作规范

## 项目范围

本项目维护「风绘云盘」的品牌素材：Logo、站点图标、Cloudrave 替换资源、预览图和宣传海报。以当前工作区为准，不要修改其他目录中的 HuiDev Pan 原工作区。

## 文件职责

- `assets/originals/`：原始 Cloudrave 资源与 miku.svg，保留原件。
- `assets/readme-cover.svg`：README 顶部动态封面，由 `logo/source/build-cover.mjs` 生成。封面外框与裁切区域使用直角；保持无外部资源、无脚本，并兼容减少动态效果设置。
- 根目录 `cloudrave/`：用户保留的原件副本，不是新版交付入口。
- `logo/source/`：生成源、字形轮廓与构建脚本，是修改 Logo 的主要入口。
- `logo/`：常用站点资源；`icons/`、`variants/`、`png/` 分别保存图标、其他版式和栅格导出。
- `logo/cloudrave/`：新版可替换的五个文件，由打包脚本同步。
- `logo/preview/`：总览、对照图与浏览器预览页。
- `poster/`：海报与生成提示词，保持独立于 Logo 的改动。
- `deliverables/`：可重新生成的最新 ZIP，不提交 Git。
- `archive/`：历史交付包，不提交 Git，不作为当前设计来源。

## 已确认的设计约束

- 品牌名称为「风绘云盘」，中文文字使用矢量轮廓，避免依赖使用者的字体。
- 彩色图标共用一套，不新增单独的深色主题图标；保留单色印刷用途素材。
- 横版与竖版 Logo 保留深色文字、浅色文字两种，导出背景透明。展示总览可使用对比底色，但不能把底色烘焙进实际 Logo 文件。
- 完整角色坐在云层中部，略向左调整。当前完整角色视口为 `x=97, y=115, width=330, height=302`，如用户提出新的位置要求再修改。
- 简化玩偶位于圆形中央，当前位移为 `translate(0 -28)`，底部没有白色云朵。
- 总览第二个 Logo 使用 `translate(178 70) scale(.54)`，保留底部留白。
- 不擅自加入域名、二维码、容量、价格或服务承诺。后续用户指令优先于此处记录。

## 修改与重建

1. 先检查现有文件和用户改动。保留已有分类，避免无关目录调整。
2. 修改矢量设计时，优先编辑 `logo/source/build.mjs`，不要只改生成文件。
3. 克隆项目后先从根目录运行 `npm ci` 安装锁定的 Sharp 依赖，再运行 `npm run build`（或 `node logo/source/build.mjs`）。维护 `package.json` 与 `package-lock.json`，不要在脚本中写入本机依赖的绝对路径。
4. 运行 `python logo/source/package.py`，同步 `logo/cloudrave/` 并更新 `deliverables/fenghui-cloud-logo-kit.zip`。
5. 只有修改中文字形时，才需要在 Windows 上运行 `logo/source/build-wordmark.ps1`；它依赖微软雅黑粗体。不要无故重新生成已有字形。
6. 用户只要求预览排版时，修改展示布局，不顺带改变实际 Logo。

## 交付检查

- 查看受影响的图片，确认文字、角色位置、边距和缩小后的清晰度。
- 确认实际 Logo 的 PNG 有 Alpha 通道，空白角落透明；SVG 不含整页底色。
- 打包后，`logo/cloudrave/` 必须包含且仅包含 `logo.svg`、`logo_light.svg`、`logo192.png`、`logo512.png`、`favicon.ico`，内容与 `logo/` 的对应文件一致。
- 如移动文件，检查 `preview.html`、README、manifest 和脚本引用路径。
- 不为简单排版调整新增测试框架；用文件检查和视觉检查完成验证即可。

## Git 与交付

- `.gitignore` 排除交付 ZIP、历史归档、依赖、缓存、日志与本地环境文件。保留源素材、成品 SVG/PNG/ICO、海报、说明和脚本。
- 不使用全局 `*.png`、`*.svg`、`*.ico` 忽略规则，这些是项目主要内容。
- 不修改用户身份、远程地址，不自动初始化仓库、提交或推送，除非用户要求。
- 结束时用中文简要说明修改内容和验证结果，并给出实际成品路径。
