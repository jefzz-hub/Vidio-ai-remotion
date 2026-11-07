import fs from 'node:fs';
import path from 'node:path';
const ep=JSON.parse(fs.readFileSync('src/kelir/data/episode.json','utf8'));
const errors=[];const finite=n=>typeof n==='number'&&Number.isFinite(n);const assert=(test,message)=>{if(!test)errors.push(message)};
const actions=new Set(['idle','walk','sit','lie','turnHead','reach','point','recoil','warn','liftFeet','stand','walkToDoor','reachDoor','recoilDoor','rescue','protect','freeze','turnBack']);
const environments=new Set(['outside','room','lamp','floor','bed','underbed','door','wall','black']);
for(const key of ['fps','width','height','seed','duration'])assert(finite(ep[key]),'Field '+key+' harus angka');
assert(Array.isArray(ep.shots)&&ep.shots.length>0,'shots wajib ada');assert(Array.isArray(ep.subtitles),'subtitles wajib ada');
const shots=ep.shots||[],titles=ep.subtitles||[];let cursor=0;const ids=new Set();
for(const s of shots){assert(typeof s.id==='string'&&!ids.has(s.id),'ID shot duplikat/tidak valid: '+s.id);ids.add(s.id);assert(environments.has(s.environment),'Shot '+s.id+': environment tidak dikenal: '+s.environment);assert(finite(s.start)&&finite(s.duration)&&s.duration>0,'Shot '+s.id+': start/duration invalid');
assert(Math.abs(s.start-cursor)<1e-5,'Shot '+s.id+': gap atau overlap, seharusnya start '+cursor);cursor=s.start+s.duration;
assert(Number.isInteger(Math.round(s.start*ep.fps)*1000/1000)&&Math.abs(s.start*ep.fps-Math.round(s.start*ep.fps))<.0001,'Shot '+s.id+': start tidak di frame grid');
assert(Math.abs(s.duration*ep.fps-Math.round(s.duration*ep.fps))<.0001,'Shot '+s.id+': durasi tidak di frame grid');
for(const a of s.actors||[]){assert(!!ep.characters?.[a.characterId],'Shot '+s.id+': karakter tidak terdaftar '+a.characterId);assert(actions.has(a.action),'Shot '+s.id+': aksi tidak dikenal '+a.action);assert(finite(a.x)&&finite(a.y)&&finite(a.scale),'Shot '+s.id+': posisi/scale karakter invalid');}
for(const cue of s.audio||[]){assert(cue.at>=s.start&&cue.at<s.start+s.duration,'Shot '+s.id+': cue '+cue.type+' di luar waktu shot');assert(fs.existsSync('public/audio/'+cue.type+'.wav'),'Audio efek hilang: '+cue.type+'.wav');}
}
assert(Math.abs(cursor-ep.duration)<1e-5,'Durasi total salah: '+cursor+' vs '+ep.duration);
assert(Math.abs(ep.duration*ep.fps-Math.round(ep.duration*ep.fps))<1e-5,'Durasi bukan frame bulat');
let last=0;for(const [i,s] of titles.entries()){assert(finite(s.start)&&finite(s.end)&&s.start>=0&&s.end>s.start&&s.end<=ep.duration,'Subtitle '+i+' di luar durasi');assert(s.start>=last,'Subtitle '+i+' bertumpuk');assert(s.text.length<=100,'Subtitle '+i+' terlalu panjang');last=s.end;}
for(const track of ['ambience','tension'])assert(fs.existsSync('public/'+ep.audio[track].src),'Audio lokal hilang: '+ep.audio[track].src);
if(ep.audio.narration.src)assert(fs.existsSync('public/'+ep.audio.narration.src),'Narasi tidak ditemukan: '+ep.audio.narration.src);
assert(shots.length>=18&&shots.length<=22,'Ekspektasi 18–22 shot, diterima '+shots.length);
if(errors.length){console.error('VALIDASI GAGAL:\n'+errors.map(x=>' - '+x).join('\n'));process.exit(1)}
console.log('VALIDASI OK:',shots.length,'shot,',titles.length,'subtitle,',ep.duration,'detik,',ep.duration*ep.fps,'frame, narasi:',ep.audio.narration.src??'belum ada');
