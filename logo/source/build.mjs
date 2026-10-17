import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url);
const sharp=require('sharp');
const out=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const root=path.dirname(out);
const read=p=>fs.readFileSync(p,'utf8').replace(/^\uFEFF/,'');
const groups={
 icons:['icon.svg','icon-compact.svg','icon-compact.png','icon-mono.svg','icon-mono-white.svg','favicon-16x16.png','favicon-32x32.png','apple-touch-icon.png'],
 variants:['logo-stacked.svg','logo-stacked-light.svg','logo-mono.svg','wordmark.svg','wordmark-light.svg'],
 preview:['brand-preview.svg','brand-overview.png','logo-preview-light.png','logo-preview-dark.png','logo-comparison.png','preview.html']
};
const asset=(...parts)=>{
 if(parts.length>1) return path.join(out,...parts);
 const name=parts[0];
 const folder=Object.keys(groups).find(key=>groups[key].includes(name));
 return folder?path.join(out,folder,name):path.join(out,name);
};
for(const dir of Object.keys(groups))fs.mkdirSync(path.join(out,dir),{recursive:true});
const write=(name,s)=>fs.writeFileSync(asset(name),s);
fs.mkdirSync(asset('png'),{recursive:true});
const wm=JSON.parse(read(asset('source','wordmark-path.json')));
let cloud=read(asset('source','cloud-symbol-source.svg'));
cloud=cloud.replaceAll('rgb(203,233,247)','#D5EFF1').replaceAll('rgb(0,81,205)','#176982').replaceAll('rgb(5,111,238)','#198DA6').replaceAll('rgb(2,192,250)','#36B7C5').replaceAll('rgb(0,221,255)','#8BDFDF').replaceAll('rgb(235,235,235)','#E7F7F7');
let miku=read(asset('source','miku-original.svg'));
miku=miku.slice(miku.indexOf('<defs>'),miku.lastIndexOf('</svg>'));
// A small cloud on the phone visually connects the character to the storage brand.
miku=miku.replace('<path fill="#fff4ed"', '<path fill="#F4FFFF" stroke="none" d="M640 783C640 774 646 768 653 769C656 758 673 757 678 769C688 767 695 776 692 784C690 790 685 792 678 792H650C644 792 640 789 640 783Z"/><path fill="#fff4ed"');
const shell=(w,h,body,title='风绘云盘')=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" role="img" aria-labelledby="brand-title"><title id="brand-title">${title}</title>${body}</svg>`;
const orb=`<svg width="512" height="512" viewBox="0 0 331 331">${cloud}</svg>`;
// Place the seated body slightly left of the cloud's center for optical balance.
// A slightly smaller character and lower seat leave the sky visible and settle the feet into the cloud.
const character=`<svg x="97" y="115" width="330" height="302" viewBox="160 100 1160 1060">${miku}</svg>`;
const full=orb+character;
// Small-size mark: centered twin-tail doll with no cloud accent underneath.
// Facial detail is intentionally reduced so the mark stays clear in a browser tab.
const compact=`<circle cx="256" cy="256" r="252" fill="#D5EFF1"/><circle cx="256" cy="256" r="216" fill="#198DA6"/><path d="M194 63A216 216 0 0 1 468 256C348 302 174 245 194 63Z" fill="#36B7C5"/><path d="M301 46A216 216 0 0 1 449 162C359 203 289 140 301 46Z" fill="#8BDFDF"/><g transform="translate(0 -28)"><path d="M148 182C94 172 98 263 72 355C64 387 70 414 99 420C143 429 159 383 163 341L186 206Z" fill="#8CC9CA" stroke="#173647" stroke-width="16" stroke-linejoin="round"/><path d="M364 182C418 172 414 263 440 355C448 387 442 414 413 420C369 429 353 383 349 341L326 206Z" fill="#8CC9CA" stroke="#173647" stroke-width="16" stroke-linejoin="round"/><path d="M139 198L156 148L189 156L177 203M335 203L323 156L356 148L373 198" fill="#EE8CA9" stroke="#173647" stroke-width="15" stroke-linejoin="round"/><path d="M137 252C137 187 186 151 251 151C324 151 376 193 376 256L370 294C395 301 408 322 402 345C397 368 377 381 352 381H160C133 381 111 364 110 340C109 320 123 303 142 298Z" fill="#FFF6EF" stroke="#173647" stroke-width="16" stroke-linejoin="round"/><path d="M138 264C127 213 157 165 214 154C245 145 280 150 302 158C351 166 380 205 376 260C353 257 324 235 308 207C293 241 273 258 252 257C231 257 220 233 215 210C193 237 167 256 138 264Z" fill="#8CC9CA" stroke="#173647" stroke-width="16" stroke-linejoin="round"/><path d="M187 291V311M325 291V311" stroke="#173647" stroke-width="23" stroke-linecap="round"/><path d="M244 331Q256 341 268 331" stroke="#C7748E" stroke-width="12" stroke-linecap="round"/></g>`;
function word(color,width=660){let s=width/wm.bounds.width;return `<g transform="scale(${s}) translate(${-wm.bounds.x} ${-wm.bounds.y})"><path d="${wm.path}" fill="${color}" fill-rule="evenodd"/></g>`;}
const wmHeight=660/wm.bounds.width*wm.bounds.height;
function horizontal(color){return shell(1060,320,`<g transform="translate(8 8) scale(.59375)">${full}</g><g transform="translate(374 ${160-wmHeight/2})">${word(color)}</g>`);}
function stacked(color){return shell(800,880,`<g transform="translate(144 46)">${full}</g><g transform="translate(70 635)">${word(color)}</g>`);}
write('icon.svg',shell(512,512,full));
write('icon-compact.svg',shell(512,512,compact,'风绘云盘 · 小尺寸图标'));
write('favicon.svg',shell(512,512,compact,'风绘云盘 · 网站图标'));
await sharp(Buffer.from(shell(512,512,compact))).png().toFile(asset('icon-compact.png'));
write('logo.svg',horizontal('#163849'));
write('logo_light.svg',horizontal('#F2FAFC'));
write('logo-stacked.svg',stacked('#163849'));
write('logo-stacked-light.svg',stacked('#F2FAFC'));
write('wordmark.svg',shell(660,Math.ceil(wmHeight),word('#163849')));
write('wordmark-light.svg',shell(660,Math.ceil(wmHeight),word('#F2FAFC')));
// One-color emblem for stamps and single-ink applications.
const monoFinal=`<defs><mask id="mono-face"><rect width="512" height="512" fill="white"/><path d="M141 272C167 261 193 242 215 210C220 233 231 257 252 257C273 258 293 241 308 207C324 235 353 257 376 260L370 294C395 301 408 322 402 345C397 368 377 381 352 381H160C133 381 111 364 110 340C109 320 123 303 142 298Z" fill="black"/></mask></defs><circle cx="256" cy="256" r="236" stroke="currentColor" stroke-width="28"/><g transform="translate(0 -28)"><g mask="url(#mono-face)"><path d="M148 182C94 172 98 263 72 355C64 387 70 414 99 420C143 429 159 383 163 341L186 206ZM364 182C418 172 414 263 440 355C448 387 442 414 413 420C369 429 353 383 349 341L326 206Z" fill="currentColor"/><path d="M139 198L156 148L189 156L177 203M335 203L323 156L356 148L373 198" stroke="currentColor" stroke-width="15" stroke-linejoin="round"/><path d="M137 252C137 187 186 151 251 151C324 151 376 193 376 256L370 294C395 301 408 322 402 345C397 368 377 381 352 381H160C133 381 111 364 110 340C109 320 123 303 142 298Z" fill="currentColor" stroke="currentColor" stroke-width="16"/></g><path d="M187 291V311M325 291V311" stroke="currentColor" stroke-width="23" stroke-linecap="round"/><path d="M244 331Q256 341 268 331" stroke="currentColor" stroke-width="12" stroke-linecap="round"/></g>`;
write('icon-mono.svg',shell(512,512,`<g color="#163849">${monoFinal}</g>`));
write('icon-mono-white.svg',shell(512,512,`<g color="#FFFFFF">${monoFinal}</g>`));
write('logo-mono.svg',shell(1060,320,`<g transform="translate(8 8) scale(.59375)" color="#163849">${monoFinal}</g><g transform="translate(374 ${160-wmHeight/2})">${word('#163849')}</g>`));
for(const n of ['logo','logo_light','logo-stacked','logo-stacked-light','wordmark','wordmark-light','icon-mono','icon-mono-white','logo-mono']){
 const input=asset(n+'.svg');
 const {width,height}=await sharp(input).metadata();
 await sharp(input,{density:144}).resize(width*2,height*2,{fit:'fill'}).png().toFile(asset('png',n+'@2x.png'));
 await sharp(input).png().toFile(asset('png',n+'.png'));
}
// Theme variants belong to the wordmark; the color icon stays the same in both.
for(const [name,color] of [
 ['logo-preview-light','#163849'],
 ['logo-preview-dark','#F2FAFC']
]){
 await sharp(Buffer.from(horizontal(color)))
  .extend({top:40,bottom:40,left:40,right:40,background:{r:0,g:0,b:0,alpha:0}}).png()
  .toFile(asset(name+'.png'));
}
await sharp({create:{width:1140,height:800,channels:4,background:{r:0,g:0,b:0,alpha:0}}})
 .composite([
  {input:asset('logo-preview-light.png'),left:0,top:0},
  {input:asset('logo-preview-dark.png'),left:0,top:400}
 ]).png().toFile(asset('logo-comparison.png'));
for(const size of [16,32,48,64,100,128,180,192,256,512,1024]){
 const source=size<128 && size!==100?'icon-compact.svg':'icon.svg';
 await sharp(asset(source)).resize(size,size).png().toFile(asset('png',`icon-${size}.png`));
}
for(const size of [100,192,512])fs.copyFileSync(asset('png',`icon-${size}.png`),asset(`logo${size}.png`));
fs.copyFileSync(asset('png','icon-180.png'),asset('apple-touch-icon.png'));
for(const size of [16,32])fs.copyFileSync(asset('png',`icon-${size}.png`),asset(`favicon-${size}x${size}.png`));
// ICO directory with PNG-compressed image entries, supported by modern browsers and Windows.
const icoSizes=[16,32,48,64,128,256];
const buffers=await Promise.all(icoSizes.map(s=>sharp(asset('icon-compact.svg')).resize(s,s).png().toBuffer()));
const header=Buffer.alloc(6+16*buffers.length);header.writeUInt16LE(1,2);header.writeUInt16LE(buffers.length,4);
let offset=header.length;
buffers.forEach((b,i)=>{let p=6+16*i;header[p]=icoSizes[i]===256?0:icoSizes[i];header[p+1]=header[p];header.writeUInt16LE(1,p+4);header.writeUInt16LE(32,p+6);header.writeUInt32LE(b.length,p+8);header.writeUInt32LE(offset,p+12);offset+=b.length;});
write('favicon.ico',Buffer.concat([header,...buffers]));
write('site.webmanifest',JSON.stringify({name:'风绘云盘',short_name:'风绘云盘',icons:[{src:'./logo192.png',sizes:'192x192',type:'image/png'},{src:'./logo512.png',sizes:'512x512',type:'image/png'}],theme_color:'#198DA6',background_color:'#F4FAFB',display:'standalone'},null,2));
// A static overview, rendered with SVG paths so Chinese type never relies on the viewer's fonts.
const panel=(x,y,w,h,bg,body)=>`<g transform="translate(${x} ${y})"><rect width="${w}" height="${h}" rx="24" fill="${bg}"/>${body}</g>`;
const label=(x,y,s,color='#78909B')=>`<text x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="16" letter-spacing="3" fill="${color}">${s}</text>`;
const preview=shell(1600,1240,`<rect width="1600" height="1240" fill="#EDF4F5"/>${label(64,54,'FENGHUI CLOUD / VISUAL IDENTITY', '#376473')}${panel(48,86,1504,442,'#FFFFFF',label(36,45,'01 / PRIMARY')+`<g transform="translate(234 107) scale(.96)">${horizontal('#163849').replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')}</g>`)}${panel(48,552,928,270,'#102A37',label(32,40,'02 / DARK SURFACE','#82A5B3')+`<g transform="translate(178 70) scale(.54)">${horizontal('#F2FAFC').replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')}</g>`)}${panel(1000,552,552,270,'#E0F2F1',label(30,40,'03 / APPLICATION ICONS')+`<g transform="translate(35 65) scale(.33)">${full}</g><g transform="translate(258 100) scale(.22)">${compact}</g><g transform="translate(420 142) scale(.09375)">${compact}</g>`)}${panel(48,846,450,346,'#FFFFFF',label(30,42,'04 / STACKED')+`<g transform="translate(104 52) scale(.3)">${stacked('#163849').replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')}</g>`)}${panel(522,846,454,346,'#FFFFFF',label(30,42,'05 / SINGLE COLOR')+`<g transform="translate(122 88) scale(.41)" color="#163849">${monoFinal}</g>`)}${panel(1000,846,552,346,'#FFFFFF',label(30,42,'06 / BRAND PALETTE')+['#163849','#198DA6','#8CC9CA','#EE8CA9','#D5EFF1'].map((c,i)=>`<rect x="${30+i*100}" y="91" width="84" height="139" rx="16" fill="${c}"/><text x="${30+i*100}" y="258" font-family="Arial,sans-serif" font-size="14" fill="#526F7B">${c}</text>`).join(''))}`);
write('brand-preview.svg',preview);
write('brand-overview.png',await sharp(asset('brand-preview.svg')).png().toBuffer());
write('preview.html',`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>风绘云盘 · 标志套件</title><style>*{box-sizing:border-box}body{margin:0;background:#edf4f5;color:#163849;font:15px/1.7 "Microsoft YaHei",sans-serif}main{max-width:1400px;margin:auto;padding:30px}h1{font-size:24px;margin:0 0 5px}p{color:#58727d}a{color:#15778a}img{max-width:100%;display:block}.overview{width:100%;border-radius:20px}.sizes{background:white;border-radius:20px;padding:28px;display:flex;gap:40px;align-items:center;flex-wrap:wrap;margin:22px 0}.sample{display:grid;gap:10px;justify-items:center}.sample small{color:#58727d}.links{display:flex;gap:20px;flex-wrap:wrap}</style><main><h1>风绘云盘 · 标志套件</h1><p>圆形云朵 × 双马尾角色。完整角色用于品牌展示，小尺寸标志用于浏览器标签页。</p><img class="overview" src="brand-preview.svg" alt="风绘云盘全套标志预览"><div class="sizes">${[16,32,48,64,100,128,192].map(s=>`<div class="sample"><img src="../png/icon-${s}.png" width="${s}" height="${s}" alt="${s}像素图标"><small>${s} × ${s}</small></div>`).join('')}</div><div class="links"><a href="../logo.svg">浅色背景横版</a><a href="../logo_light.svg">深色背景横版</a><a href="../variants/logo-stacked.svg">竖版</a><a href="../icons/icon.svg">完整图标</a><a href="../favicon.svg">小尺寸图标</a><a href="../README.md">使用说明</a></div></main></html>`);
console.log('Created Fenghui Cloud logo suite.');
await import('./build-cover.mjs');
