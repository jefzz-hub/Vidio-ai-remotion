import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Shot} from './schema';
import {CharacterRig, easing} from './rig';
import {Environment, Lamp, WorldDefs} from './environment';
import {PALETTE} from './appearance';
const hash=(n:number)=>{let v=n|0;v=Math.imul(v^v>>>16,0x7feb352d);v=Math.imul(v^v>>>15,0x846ca68b);return ((v^v>>>16)>>>0)/4294967295;};
export const ShotScene:React.FC<{shot:Shot;seed:number}>=({shot,seed})=>{
 const frame=useCurrentFrame(); const {fps}=useVideoConfig(); const t=frame/fps; const absolute=shot.start+t;
 const camera=shot.camera; const progress=easing(t/shot.duration);
 const zoom=camera.zoom*(1+camera.push*progress);
 const camX=camera.x+camera.moveX*progress; const camY=camera.y+camera.moveY*progress;
 const transform=`translate(540 920) scale(${zoom}) translate(${-camX} ${-camY})`;
 const inRoom=shot.environment!=='outside'&&shot.environment!=='black';
 const shadowBreak=shot.shadow==='break';
 const shower=shot.effects.includes('rain');
 const particles=Array.from({length:shower?54:shot.effects.includes('embers')?14:0},(_,i)=>{
   const h1=hash(seed+i*71),h2=hash(seed+i*91+1234);
   const speed=shower?250+hash(i+seed)*200:16;
   const xx=(h1*1170-50+(shower?absolute*32:Math.sin(absolute*.7+i)*9))%1180;
   const yy=((h2*1950+(shower?absolute*speed:-absolute*speed))%2000+2000)%2000;
   return <path key={i} d={shower?'M0 0l-9 27':'M0 0l2 -3'} transform={`translate(${xx} ${yy})`} stroke={shower?'#AAB9BF':'#E7AA53'} strokeOpacity={shower?.20:.28} strokeWidth={shower?1.3:2}/>;
 });
 return <svg viewBox="0 0 1080 1920" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
 <WorldDefs/>
 <g transform={transform}>
  <Environment shot={shot}/>
  {inRoom&&shot.shadow!=='none'&&<g opacity={shadowBreak?.62:.33} filter={shadowBreak?'url(#shadowBlur)':'url(#softBlur)'} transform="translate(-160 -155) scale(1.23 1.02)">
   {shot.actors.filter(a=>a.characterId==='rani').map(a=><CharacterRig key={a.characterId} actor={{...a,x:a.x-45,y:a.y-120}} seconds={absolute} localTime={t} fps={fps} shadow overrideAction={shadowBreak?'freeze':a.action} headOffset={shadowBreak?interpolate(absolute,[70,73.8,75.2],[0,0,-58],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}):0}/>)}
  </g>}
  {inRoom&&<g>{shot.actors.map((actor)=>{
   const walk=actor.action==='walkToDoor'; const travel=walk?interpolate(absolute,[43.6,47],[695,770],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}):actor.x;
   const nenek=actor.characterId==='nenek'; const rise=nenek?interpolate(absolute,[50,51,53.5,56],[0,.25,.75,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}):0;
   const x=nenek&&absolute>=50?interpolate(rise,[0,1],[actor.x,690]):travel;
   const y=nenek&&absolute>=50?interpolate(rise,[0,1],[actor.y,1250]):actor.y;
   const action=nenek&&absolute>=50?(rise<.2?'lie':rise<.72?'sit':actor.action):actor.action;
   return <CharacterRig key={actor.characterId} actor={{...actor,x,y,action}} seconds={absolute} localTime={t} fps={fps}/>;
  })}</g>}
  {inRoom&&shot.environment!=='underbed'&&shot.environment!=='floor'&&<Lamp seconds={absolute} seed={seed}/>}
  {inRoom&&shot.environment==='floor'&&<g><path d="M570 1260L580 1530" stroke="#080606" strokeWidth="9"/><ellipse cx="570" cy="1260" rx="95" ry="17" fill="#100B08" opacity=".6"/></g>}
  {particles}
 </g>
 {shot.environment==='black'&&<g><text x="540" y="900" textAnchor="middle" fontSize="65" fill="#D2AB78" fontFamily="Georgia,serif" letterSpacing="8">BERSAMBUNG</text><path d="M420 934H660" stroke="#805125" strokeWidth="3"/></g>}
 <rect width="1080" height="1920" fill="url(#frameDark)" pointerEvents="none"/>
 <rect width="1080" height="1920" fill="#100B08" opacity=".065" pointerEvents="none"/>
 </svg>;
};
