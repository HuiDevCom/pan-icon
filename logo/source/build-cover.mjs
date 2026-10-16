import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const source=path.dirname(fileURLToPath(import.meta.url));
const project=path.dirname(path.dirname(source));
const load=name=>JSON.parse(fs.readFileSync(path.join(source,name),'utf8').replace(/^\uFEFF/,''));
const word=load('wordmark-path.json');
const subtitle=load('cover-typography.json');
const icon=fs.readFileSync(path.join(project,'logo/icons/icon.svg'),'utf8');
// Animate only the embedded cover eyes; the exported brand icons stay static.
const openEyeMarker='<g id="eyes">';
const frontHairMarker='<g id="front-hair-details"';
if(!icon.includes(openEyeMarker)||!icon.includes(frontHairMarker))throw new Error('Mascot eye groups were not found.');
const closedEyes='<g id="cover-closed-eyes" class="cover-closed-eyes" fill="none" stroke="#0c142d" stroke-width="13" stroke-linecap="round"><path d="M487 550Q547 581 609 548M746 549Q818 582 887 551"/></g>';
const iconContent=icon.replace(/^<svg[^>]*>/,'').replace(/<\/svg>\s*$/,'')
 .replace(openEyeMarker,'<g id="eyes" class="cover-open-eyes">')
 .replace(frontHairMarker,closedEyes+frontHairMarker);
const outline=(data,x,y,width,color)=>`<g transform="translate(${x} ${y}) scale(${width/data.bounds.width}) translate(${-data.bounds.x} ${-data.bounds.y})"><path d="${data.path}" fill="${color}" fill-rule="evenodd"/></g>`;

const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="480" viewBox="0 0 1280 480" fill="none" role="img" aria-labelledby="cover-title cover-desc">
<title id="cover-title">风绘云盘 · 动态品牌封面</title>
<desc id="cover-desc">青绿色品牌封面，右侧双马尾角色轻轻浮动并自然眨眼，云层与文件卡片缓慢移动。中文名称与副标题均为矢量轮廓，无外部资源或脚本。</desc>
<defs>
 <linearGradient id="cover-bg" x1="0" y1="0" x2="1280" y2="480" gradientUnits="userSpaceOnUse"><stop stop-color="#F5FCFC"/><stop offset=".55" stop-color="#EAF8F8"/><stop offset="1" stop-color="#C8EBED"/></linearGradient>
 <radialGradient id="cover-glow"><stop stop-color="white" stop-opacity=".95"/><stop offset="1" stop-color="white" stop-opacity="0"/></radialGradient>
 <linearGradient id="cover-line" x1="72" y1="375" x2="700" y2="375" gradientUnits="userSpaceOnUse"><stop stop-color="#198DA6" stop-opacity=".5"/><stop offset="1" stop-color="#198DA6" stop-opacity="0"/></linearGradient>
 <pattern id="cover-dots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#198DA6" opacity=".1"/></pattern>
 <filter id="cover-shadow" x="-50%" y="-50%" width="200%" height="220%"><feDropShadow dx="0" dy="8" stdDeviation="9" flood-color="#176982" flood-opacity=".1"/></filter>
 <clipPath id="cover-bound"><rect width="1280" height="480"/></clipPath>
</defs>
<style>
 .cover-bob{animation:cover-bob 7s ease-in-out infinite}
 .cover-open-eyes{transform-box:fill-box;transform-origin:50% 60%;animation:cover-blink-open 6s ease-in-out infinite}
 .cover-closed-eyes{opacity:0;animation:cover-blink-closed 6s ease-in-out infinite}
 .cover-card-a{animation:cover-card-a 9s ease-in-out infinite}
 .cover-card-b{animation:cover-card-b 11s ease-in-out infinite}
 .cover-cloud{animation:cover-cloud 13s ease-in-out infinite}
 .cover-orbit{animation:cover-orbit 32s linear infinite}
 .cover-pulse{animation:cover-pulse 5s ease-in-out infinite}
 @keyframes cover-blink-open{0%,42%,47%,100%{transform:scaleY(1);opacity:1}44.5%,45%{transform:scaleY(.03);opacity:0}}
 @keyframes cover-blink-closed{0%,43.2%,46.3%,100%{opacity:0}44.5%,45%{opacity:1}}
 @keyframes cover-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
 @keyframes cover-card-a{0%,100%{transform:translateY(0)}50%{transform:translateY(12px)}}
 @keyframes cover-card-b{0%,100%{transform:translateY(0)}50%{transform:translateY(-11px)}}
 @keyframes cover-cloud{0%,100%{transform:translateX(0)}50%{transform:translateX(14px)}}
 @keyframes cover-orbit{to{stroke-dashoffset:-104}}
 @keyframes cover-pulse{0%,100%{opacity:.45}50%{opacity:1}}
 @media(prefers-reduced-motion:reduce){.cover-bob,.cover-card-a,.cover-card-b,.cover-cloud,.cover-orbit,.cover-pulse,.cover-open-eyes,.cover-closed-eyes{animation:none}}
</style>
<g clip-path="url(#cover-bound)">
 <rect width="1280" height="480" fill="url(#cover-bg)"/>
 <rect x="712" width="568" height="480" fill="url(#cover-dots)"/>
 <ellipse cx="930" cy="160" rx="420" ry="320" fill="url(#cover-glow)"/>
 <path d="M682 480C777 345 772 110 945 0H1280V480Z" fill="#BCE6E8" opacity=".27"/>
 <path d="M738 480C829 316 810 118 1000 0" stroke="white" stroke-width="2" opacity=".65"/>

 <g font-family="Arial,Helvetica,sans-serif">
  <circle cx="79" cy="86" r="5" fill="#198DA6"/>
  <text x="98" y="92" font-size="16" letter-spacing="3" fill="#376875">FENGHUI CLOUD</text>
  <text x="72" y="414" font-size="12" letter-spacing="2.3" fill="#547B87">BRAND ASSETS</text>
  <text x="248" y="414" font-size="12" letter-spacing="1.5" fill="#7696A0">SVG / PNG / ICO</text>
 </g>
 ${outline(word,66,151,566,'#163849')}
 ${outline(subtitle,73,319,440,'#416D7C')}
 <path d="M73 375H696" stroke="url(#cover-line)"/>

 <circle cx="1010" cy="239" r="202" stroke="white" stroke-width="2" opacity=".8"/>
 <circle class="cover-orbit" cx="1010" cy="239" r="216" stroke="#198DA6" stroke-opacity=".25" stroke-width="1.5" stroke-dasharray="4 22"/>
 <circle class="cover-pulse" cx="864" cy="87" r="6" fill="#EE8CA9"/>
 <circle class="cover-pulse" cx="1210" cy="174" r="4" fill="#198DA6"/>
 <circle cx="859" cy="397" r="5" fill="#198DA6" opacity=".35"/>

 <g transform="translate(845 78)"><g class="cover-bob"><svg width="330" height="330" viewBox="0 0 512 512">${iconContent}</svg></g></g>

 <g transform="translate(776 151)"><g class="cover-card-a"><g transform="rotate(-12 42 48)" filter="url(#cover-shadow)">
  <rect width="80" height="96" rx="15" fill="white" fill-opacity=".92" stroke="#C7E7E9"/>
  <rect x="18" y="20" width="44" height="8" rx="4" fill="#A9DADC"/>
  <path d="M20 45H60M20 59H52M20 73H42" stroke="#80BEC5" stroke-width="5" stroke-linecap="round"/>
 </g></g></g>
 <g transform="translate(1152 282)"><g class="cover-card-b"><g transform="rotate(11 45 37)" filter="url(#cover-shadow)">
  <path d="M1 17V10Q1 1 11 1H34L44 12H79Q89 12 89 23V65Q89 75 79 75H11Q1 75 1 65Z" fill="#79C5CC" stroke="white" stroke-width="2"/>
  <path d="M1 29Q1 20 11 20H79Q89 20 89 29V65Q89 75 79 75H11Q1 75 1 65Z" fill="#D9F3F3"/>
  <path d="M30 48C30 43 34 40 38 41C41 32 55 33 57 42C67 42 70 55 60 58H38C32 58 28 54 30 48Z" fill="#198DA6" opacity=".75"/>
 </g></g></g>

 <g class="cover-cloud" opacity=".82">
  <path d="M932 427C921 427 912 420 912 411C912 401 922 394 933 396C938 381 962 382 969 397C981 391 998 400 996 412C1007 410 1020 415 1022 427Z" fill="white"/>
  <path d="M1096 69C1082 69 1077 58 1084 50C1087 45 1092 44 1097 45C1101 31 1122 31 1128 44C1137 40 1152 46 1151 56C1160 55 1167 60 1168 69Z" fill="white"/>
 </g>
</g>
<rect x=".75" y=".75" width="1278.5" height="478.5" stroke="#D1EAEC" stroke-width="1.5"/>
</svg>`;
fs.mkdirSync(path.join(project,'assets'),{recursive:true});
fs.writeFileSync(path.join(project,'assets/readme-cover.svg'),svg+'\n');
console.log('Created animated README cover.');
