import {z} from 'zod';
const num=z.number().finite(); const nonnegative=num.nonnegative(); const positive=num.positive();
export const environmentIds=['outside','room','lamp','floor','bed','underbed','door','wall','black'] as const;
export const actionIds=['idle','walk','sit','lie','turnHead','reach','point','recoil','warn','liftFeet','stand','walkToDoor','reachDoor','recoilDoor','rescue','protect','freeze','turnBack'] as const;
const actor=z.object({characterId:z.string().min(1),x:num,y:num,scale:positive,facing:z.union([z.literal(1),z.literal(-1)]),action:z.enum(actionIds),headTurn:num.optional()}).strict();
const camera=z.object({kind:z.enum(['wide','medium','close']),zoom:positive,x:num,y:num,moveX:num,moveY:num,push:num}).strict();
const cue=z.object({type:z.enum(['rain','knock','creak','drone']),at:nonnegative,volume:z.number().min(0).max(1)}).strict();
const shot=z.object({id:z.string().min(1),start:nonnegative,duration:positive,environment:z.enum(environmentIds),camera,actors:z.array(actor),light:z.enum(['lamp','window','crack','none']),shadow:z.enum(['follow','break','none']),effects:z.array(z.enum(['grain','rain','mist','embers','crack'])),audio:z.array(cue)}).strict();
const sound=z.object({src:z.string().min(1),volume:z.number().min(0).max(1),loop:z.boolean(),fadeIn:nonnegative,fadeOut:nonnegative}).strict();
export const EpisodeSchema=z.object({channel:z.string().min(1),title:z.string().min(1),episode:z.number().int().positive(),fps:z.number().int().positive(),width:z.number().int().positive(),height:z.number().int().positive(),seed:z.number().int(),duration:positive,characters:z.record(z.string(),z.object({preset:z.enum(['rani','nenek']),name:z.string().min(1)}).strict()),audio:z.object({ambience:sound,tension:sound,narration:z.object({src:z.string().nullable(),volume:z.number().min(0).max(1),offset:nonnegative}).strict()}).strict(),shots:z.array(shot).min(1),subtitles:z.array(z.object({start:nonnegative,end:positive,text:z.string().min(1),speaker:z.enum(['narator','rani','nenek','ibu'])}).strict())}).strict();
export type Episode=z.infer<typeof EpisodeSchema>; export type Shot=Episode['shots'][number]; export type Actor=Shot['actors'][number]; export type Action=Actor['action'];
export function validateEpisode(raw:unknown):Episode{
 const result=EpisodeSchema.safeParse(raw); if(!result.success) throw Error('episode.json invalid:\n'+result.error.issues.map(i=>i.path.join('.')+': '+i.message).join('\n'));
 const ep=result.data; const issues:string[]=[]; let cursor=0; const ids=new Set<string>();
 ep.shots.forEach((s,i)=>{if(ids.has(s.id))issues.push('Shot ID duplikat: '+s.id);ids.add(s.id);if(Math.abs(s.start-cursor)>1e-5)issues.push('shots['+i+'] '+s.id+': start '+s.start+' harus '+cursor+' (tanpa gap/overlap)');cursor=s.start+s.duration;
 if(!Number.isInteger(Math.round(s.start*ep.fps)*1000/1000)||Math.abs(s.start*ep.fps-Math.round(s.start*ep.fps))>1e-5 ||Math.abs(s.duration*ep.fps-Math.round(s.duration*ep.fps))>1e-5)issues.push(s.id+': waktu bukan kelipatan frame');
 s.actors.forEach(a=>{if(!ep.characters[a.characterId])issues.push(s.id+': karakter tidak terdaftar: '+a.characterId)});
 s.audio.forEach(c=>{if(c.at<s.start||c.at>=s.start+s.duration)issues.push(s.id+': audio cue di luar shot: '+c.at)});
 });
 if(Math.abs(cursor-ep.duration)>1e-5)issues.push('Akhir timeline '+cursor+' detik, episode.duration '+ep.duration);
 let last=0;ep.subtitles.forEach((s,i)=>{if(s.end<=s.start||s.end>ep.duration)issues.push('Subtitle '+i+' di luar durasi');if(s.start<last-1e-5)issues.push('Subtitle '+i+' bertumpuk dengan sebelumnya');if(s.text.length>100)issues.push('Subtitle '+i+' terlalu panjang');last=s.end;});
 if(issues.length)throw Error('Kesalahan episode.json:\n- '+issues.join('\n- '));return ep;
}
export const durationInFrames=(ep:Episode)=>Math.round(Math.max(...ep.shots.map(s=>s.start+s.duration))*ep.fps);