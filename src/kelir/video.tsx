import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import raw from './data/episode.json';
import {ShotScene} from './shot';
import {durationInFrames,validateEpisode} from './schema';
const ep=validateEpisode(raw);
const captionStyle:React.CSSProperties={position:'absolute',left:84,right:84,bottom:235,textAlign:'center',fontFamily:'Georgia, serif',fontWeight:600,fontSize:48,lineHeight:1.28,letterSpacing:.2,color:'#FFF0D4',textShadow:'0 3px 12px #090605, 1px 1px 2px #090605',whiteSpace:'normal',overflowWrap:'break-word'};
const Subtitle:React.FC=()=>{
 const frame=useCurrentFrame(); const t=frame/ep.fps;
 const sub=ep.subtitles.find(s=>t>=s.start&&t<s.end);
 if(!sub)return null;
 const fade=interpolate(t,[sub.start,sub.start+.15,sub.end-.14,sub.end],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 return <div style={{...captionStyle,opacity:fade}}>{sub.text}</div>;
};
const Soundtrack:React.FC=()=>{
 const frame=useCurrentFrame(); const time=frame/ep.fps;
 return <>
  {(['ambience','tension'] as const).map(id=>{const s=ep.audio[id];return <Audio key={id} src={staticFile(s.src)} loop={s.loop} volume={()=>s.volume*interpolate(time,[0,s.fadeIn,ep.duration-s.fadeOut,ep.duration],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}/>;})}
  {ep.audio.narration.src&&<Sequence from={Math.round(ep.audio.narration.offset*ep.fps)}><Audio src={staticFile(ep.audio.narration.src)} volume={ep.audio.narration.volume}/></Sequence>}
  {ep.shots.flatMap(shot=>shot.audio.map((cue,j)=><Sequence key={shot.id+'-'+j} from={Math.round(cue.at*ep.fps)}><Audio src={staticFile('audio/'+cue.type+'.wav')} volume={cue.volume}/></Sequence>))}
 </>;
};
export const EpisodeVideo:React.FC=()=>{
 const frame=useCurrentFrame(); const {fps}=useVideoConfig(); const t=frame/fps;
 return <AbsoluteFill style={{backgroundColor:'#100B08',overflow:'hidden'}}>
 {ep.shots.map(shot=><Sequence key={shot.id} from={Math.round(shot.start*fps)} durationInFrames={Math.round(shot.duration*fps)}><ShotScene shot={shot} seed={ep.seed}/></Sequence>)}
 <div style={{position:'absolute',top:115,left:0,right:0,textAlign:'center',fontFamily:'Georgia,serif',fontSize:27,letterSpacing:9,color:'#E7C29A',textShadow:'0 2px 9px #090605'}}>KELIR SUNYI <span style={{fontSize:18}}> / </span> EP. 01</div>
 <div style={{position:'absolute',top:156,left:0,right:0,textAlign:'center',fontFamily:'Georgia,serif',fontSize:22,letterSpacing:4,color:'#DFC49E',textShadow:'0 2px 9px #090605'}}>{ep.title.toUpperCase()}</div>
 <Subtitle/><Soundtrack/>
 </AbsoluteFill>;
};
