import React from 'react';
import {interpolate, spring} from 'remotion';
import {Actor, Action} from './schema';
import {CHARACTER_PRESETS, PALETTE} from './appearance';

export type RigPose={torso:number,head:number,lUpper:number,lLower:number,rUpper:number,rLower:number,lThigh:number,lShin:number,rThigh:number,rShin:number,lean:number,lift:number,walk:number,lie:number};
const clamp=(v:number,a=0,b=1)=>Math.max(a,Math.min(b,v));
const smooth=(v:number)=>{const n=clamp(v);return n*n*(3-2*n);};
const blend=(a:number,b:number,t:number)=>a+(b-a)*t;
const neutral:RigPose={torso:0,head:0,lUpper:9,lLower:-10,rUpper:-12,rLower:8,lThigh:0,lShin:0,rThigh:0,rShin:0,lean:0,lift:0,walk:0,lie:0};
const preset:Record<Action,Partial<RigPose>>={
 idle:{},walk:{walk:1},sit:{lThigh:-72,lShin:80,rThigh:-67,rShin:78,lean:8,lUpper:13,rUpper:-21},
 lie:{lie:1,lUpper:20,rUpper:-4},turnHead:{head:36},reach:{rUpper:-76,rLower:-20},point:{rUpper:-72,rLower:0},recoil:{lean:-12,head:-14,rUpper:-42,lUpper:31},warn:{lean:-8,rUpper:-98,rLower:-24,head:17},liftFeet:{lThigh:-85,rThigh:-90,lShin:115,rShin:106,lean:13},stand:{lean:4},walkToDoor:{walk:1},reachDoor:{rUpper:-88,rLower:-9,lean:7},recoilDoor:{rUpper:-45,rLower:24,lean:-10},rescue:{lean:12,rUpper:-75,rLower:-15},protect:{lean:12,rUpper:-80,rLower:-18},freeze:{lean:0,rUpper:-25},turnBack:{head:28,torso:-8,rUpper:-23}
};
export function poseFor(action:Action,seconds:number,transition=1,headOffset=0):RigPose {
 const target={...neutral,...preset[action]};
 const ease=smooth(transition);
 const breathing=Math.sin(seconds*1.8)*1.6;
 const walking=action==='walk'||action==='walkToDoor';
 const phase=seconds*2*Math.PI*1.45;
 const stride=walking?Math.sin(phase)*27:0;
 const knee=walking?Math.max(0,Math.sin(phase))*34:0;
 const result={...target};
 result.torso=target.torso+breathing*.32;
 result.head=target.head+headOffset+Math.sin(seconds*.9)*1.2;
 result.lUpper=target.lUpper-stride*.44;
 result.rUpper=target.rUpper+stride*.44;
 result.lThigh=target.lThigh+stride;
 result.rThigh=target.rThigh-stride;
 result.lShin=target.lShin+knee;
 result.rShin=target.rShin+Math.max(0,-Math.sin(phase))*34;
 for(const key of Object.keys(result) as (keyof RigPose)[])result[key]=blend(neutral[key],result[key],ease);
 return result;
}
export const easing=smooth;
export const joint=(angle:number,x:number,y:number)=>`translate(${x} ${y}) rotate(${angle})`;
interface RigProps{actor:Actor;seconds:number;localTime:number;fps:number;shadow?:boolean;overrideAction?:Action;headOffset?:number;opacity?:number}
export const CharacterRig:React.FC<RigProps>=({actor,seconds,localTime,fps,shadow=false,overrideAction,headOffset=0,opacity=1})=>{
 const config=CHARACTER_PRESETS[actor.characterId as keyof typeof CHARACTER_PRESETS]??CHARACTER_PRESETS.rani;
 const action=overrideAction??actor.action;
 const t=clamp(localTime/.65);
 const springFactor=spring({fps,frame:Math.max(0,Math.round(localTime*fps)),config:{damping:23,stiffness:130,mass:1}});
 const pose=poseFor(action,seconds,Math.min(t,springFactor),headOffset+(actor.headTurn??0));
 const isNenek=actor.characterId==='nenek';
 const walking=action==='walk'||action==='walkToDoor';
 const gait=walking?Math.sin(seconds*Math.PI*2*1.45):0;
 const bob=walking?Math.max(0,Math.sin(seconds*Math.PI*2*2.9))*4:Math.sin(seconds*1.8)*1.3;
 const laying=action==='lie';
 const col=shadow?PALETTE.ink:config.coat;
 const scarf=shadow?PALETTE.ink:config.shawl;
 const neck= -272;
 const x=actor.x;
 const y=actor.y-bob;
 const rot=laying?-76:0;
 return <g transform={`translate(${x} ${y}) scale(${actor.scale*actor.facing} ${actor.scale}) rotate(${rot})`} opacity={opacity}>
   <g transform={`rotate(${pose.lean})`}>
    <g transform={joint(pose.rThigh,13,-113)}>
      <path d="M-13,-3 Q17,-17 27,8 L29,113 Q21,128 2,116 Z" fill={col}/>
      <g transform={joint(pose.rShin,14,112)}>
       <path d="M-11,0 L16,0 L15,94 Q15,104 1,105 L-11,99 Z" fill={col}/>
       <path d="M-10,96 Q8,107 28,105 Q38,108 35,117 L-12,118Z" fill={col}/>
      </g>
    </g>
    <g transform={joint(pose.lThigh,-13,-112)}>
      <path d="M-18,-7 Q10,-15 24,8 L19,113 Q7,120 -14,113Z" fill={col}/>
      <g transform={joint(pose.lShin,0,109)}>
        <path d="M-14,0 L16,0 L10,99 Q-1,108 -13,97Z" fill={col}/>
        <path d="M-13,95 Q7,107 24,103 Q39,111 26,118 L-16,116Z" fill={col}/>
      </g>
    </g>
    <g transform={joint(pose.torso,0,-111)}>
      <path d={isNenek?'M-30,-178 Q0,-191 33,-168 Q40,-107 42,-10 Q4,2 -45,-9 Q-40,-106 -30,-178Z':'M-32,-178 Q0,-197 33,-178 Q32,-132 62,-5 Q0,17 -68,-4 Q-30,-127 -32,-178Z'} fill={col}/>
      <path d="M-24,-171 Q-13,-139 -5,-108 Q11,-133 20,-177" stroke={scarf} strokeWidth="15" fill="none" opacity=".86" />
      <path d="M21,-160 Q38,-116 34,-57 Q29,-40 39,-14" stroke={scarf} strokeWidth="11" fill="none" opacity=".68"/>
      <g transform={joint(pose.rUpper,28,-166)}>
        <path d="M-12,-10 Q4,-17 13,-3 L17,78 Q8,94 -8,79Z" fill={col}/>
        <g transform={joint(pose.rLower,4,79)}>
         <path d="M-11,-4 Q3,-14 13,2 L17,67 Q11,78 -4,70Z" fill={col}/>
         <path d="M-5,66 Q7,64 11,73 L15,93 Q8,102 2,87 L1,108 Q-5,115 -8,100 L-11,80Z" fill={col}/>
        </g>
      </g>
      <g transform={joint(pose.lUpper,-31,-165)}>
        <path d="M-13,-4 Q1,-15 14,-5 L16,77 Q10,89 -6,82Z" fill={col}/>
        <g transform={joint(pose.lLower,3,79)}>
          <path d="M-10,-3 Q3,-10 12,3 L14,68 Q7,79 -6,70Z" fill={col}/>
          <path d="M-8,67 Q8,62 12,77 L17,91 Q12,101 6,89 L4,106 Q-4,111 -8,98 L-13,77Z" fill={col}/>
        </g>
      </g>
      <g transform={joint(pose.head,-2,neck+109)}>
        <path d="M-15,-14 L13,-14 L12,9 L-14,9Z" fill={col}/>
        <path d={isNenek?'M-33,-77 Q-25,-107 3,-107 Q33,-105 35,-69 L28,-43 Q15,-20 -14,-30 Q-40,-48 -33,-77Z':'M-34,-83 Q-29,-115 -4,-119 Q23,-125 36,-88 Q44,-62 27,-38 Q17,-20 -11,-27 Q-38,-47 -34,-83Z'} fill={col}/>
        <path d="M-33,-92 Q-36,-117 -7,-124 Q24,-124 37,-99 Q20,-110 8,-109 Q-15,-97 -33,-92Z" fill={PALETTE.ink}/>
        <circle cx={isNenek?-31:28} cy="-113" r={config.bun} fill={PALETTE.ink}/>
        <path d="M28,-69 Q44,-61 29,-53" stroke={col} strokeWidth="10" fill="none"/>
        {!shadow&&<path d="M17,-61 L26,-60" stroke="#543723" strokeWidth="2" opacity=".58"/>}
      </g>
    </g>
   </g>
 </g>;
};
