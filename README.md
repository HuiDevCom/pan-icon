![风绘云盘动态封面](assets/readme-cover.svg)

# 风绘云盘 · 品牌素材工作区

封面源文件为 `assets/readme-cover.svg`，使用自包含 SVG 和 CSS 动画，外框为直角矩形，支持减少动态效果设置。运行 `npm run build` 会一并更新封面；不需要外部图片服务。

## 常用入口

- 最新 Logo 全套压缩包：执行打包脚本后生成于 `deliverables/fenghui-cloud-logo-kit.zip`（本地交付文件，不提交 Git）
- [Cloudrave 可直接使用的新版资源](logo/cloudrave/)
- [Logo 总览图](logo/preview/brand-overview.png)
- [浏览器预览页](logo/preview/preview.html)
- [Logo 使用说明](logo/README.md)
- [宣传海报原图](poster/fenghui-cloud-poster.png)

## 目录

```text
assets/originals/   原始 Cloudrave 素材与 miku.svg
cloudrave/          用户保留的原件
logo/               常用站点 Logo、favicon 和 manifest
  cloudrave/        按原件文件名配齐的新版资源，可用于替换
  icons/            完整角色、简化角色、单色图标与辅助尺寸
  variants/         竖版 Logo、单色 Logo 与纯文字标志
  png/              各种尺寸及 1× / 2× 透明 PNG
  preview/          总览、对照图与 HTML 预览页
  source/           原始素材副本、字形轮廓、生成与打包脚本
poster/             海报成品与生成提示词
deliverables/       最新可交付压缩包
archive/            整理前根目录中的旧压缩包
```

## 直接使用

`logo/cloudrave/` 包含新版 `logo.svg`、`logo_light.svg`、`logo192.png`、`logo512.png`、`favicon.ico`，与根目录原件 `cloudrave/` 的文件名和类型一致，可用于对应替换。全套压缩包内也包含此文件夹。运行打包脚本会同步这五个文件。

`logo/logo.svg` 为深色文字版，`logo/logo_light.svg` 为浅色文字版，两者均为透明背景。常用 `logo192.png`、`logo512.png`、`favicon.svg`、`favicon.ico` 与 `site.webmanifest` 保留在 `logo/` 根目录，方便配置站点。

彩色图标共用一套，不区分深浅色。完整角色坐于云层中部，略向左微调；简化玩偶居中，底部不保留云朵。完整角色版与简化版分别保存在 `logo/icons/`。

构建需要 Node.js（版本要求见 `package.json`）及 Python 3。克隆项目后运行 `npm ci` 安装已锁定的依赖，再运行 `npm run build` 生成素材，运行 `npm run package` 同步 Cloudrave 替换文件并打包。打包命令需要系统中可用的 `python` 命令；也可以直接用 Python 3 执行 `logo/source/package.py`。

`assets/originals/` 保留用户提供的原始素材，内容未改动。`archive/` 仅供历史留存，交付使用 `deliverables/` 中的版本。

## pan icon 副本与版本管理

当前目录 `pan icon` 是风绘云盘品牌素材的独立工作副本。目录已按原始素材、Logo、海报、最新交付包和历史归档分类；新版站点替换资源使用 `logo/cloudrave/`，根目录的 `cloudrave/` 保留原件。

- [代理协作规范](AGENTS.md)：项目结构、设计约束、重建与交付检查。
- [.gitignore](.gitignore)：排除交付压缩包、历史归档、缓存、依赖、日志和本地环境文件。

源素材、SVG、PNG、ICO、海报、提示词和脚本保留在版本管理范围内。`deliverables/` 与 `archive/` 即使不提交 Git，本地文件仍然保留。忽略规则只对未跟踪文件生效；已经被 Git 跟踪的文件需要另行处理。

交付包可从版本管理中的源文件重新生成。构建依赖记录在 `package.json` 和 `package-lock.json` 中，本地依赖目录不提交 Git。
