import fs from 'node:fs';
const ep=JSON.parse(fs.readFileSync('src/kelir/data/episode.json','utf8'));
const fmt=secs=>{const ms=Math.round(secs*1000);const hr=Math.floor(ms/3600000),min=Math.floor(ms/60000)%60,s=Math.floor(ms/1000)%60,m=ms%1000;return String(hr).padStart(2,'0')+':'+String(min).padStart(2,'0')+':'+String(s).padStart(2,'0')+','+String(m).padStart(3,'0');};
fs.mkdirSync('exports',{recursive:true});
fs.writeFileSync('exports/narration.txt',ep.subtitles.map(s=>s.speaker==='narator'?s.text:'['+s.speaker+'] '+s.text).join('\n')+'\n');
fs.writeFileSync('exports/subtitles.srt',ep.subtitles.map((s,i)=>[i+1,fmt(s.start)+' --> '+fmt(s.end),s.text,''].join('\n')).join('\n'));
console.log('Ekspor: exports/narration.txt, exports/subtitles.srt');
