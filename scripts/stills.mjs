import {spawnSync} from 'node:child_process';import fs from 'node:fs';
const ep=JSON.parse(fs.readFileSync('src/kelir/data/episode.json','utf8'));
fs.mkdirSync('out/stills',{recursive:true});
for(const sec of [2,12,22,32,42,52,62,68,73,74.8,78]){
 const frame=Math.floor(sec*ep.fps),out='out/stills/frame-'+String(sec).replace('.','_')+'s.png';
 const cmd=['remotion','still','src/index.ts','KetukanDariKolong',out,'--frame='+frame,'--scale=0.5','--log=error'];
 console.log('Still '+sec+'s -> '+out);const r=spawnSync('npx',cmd,{stdio:'inherit'});if(r.status!==0)process.exit(r.status??1);
}
