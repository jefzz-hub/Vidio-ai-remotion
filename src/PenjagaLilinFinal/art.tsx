import React from 'react';
import {AbsoluteFill, Img, interpolate, random, staticFile} from 'remotion';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const asset = (name: string) => staticFile(`penjaga-lilin-final/${name}`);
export const key = (f: number, frames: number[], values: number[]) => interpolate(f, frames, values, clamp);

/** Full-resolution painted layers. Clip regions share pixels at their joints. */
export const Woman: React.FC<{frame: number}> = ({frame: f}) => {
  const headTurn = key(f, [0, 88, 122, 163, 215, 252, 285], [0, 0, -3, -2, -5, -8, -10]);
  const armLift = key(f, [0, 87, 125, 150, 219, 248, 278], [0, 0, -3, -2, -3, -12, -16]);
  const common: React.CSSProperties = {position: 'absolute', width: 650, height: 975, left: 0, top: 0};
  return <div style={{position: 'absolute', left: 125, top: 655, width: 650, height: 975, filter: 'brightness(.61) contrast(1.48) saturate(.68)', transform: `translateY(${Math.sin(f / 22) * .7}px)`}}>
    <Img src={asset('woman.png')} style={{...common, clipPath: 'polygon(0 41.5%,21.5% 41.5%,21.5% 100%,0 100%)', transformOrigin: '18% 43%', transform: `rotate(${Math.sin(f / 21) * .8 + key(f, [220, 275], [0, -1.6])}deg)`}} />
    <Img src={asset('woman.png')} style={{...common, clipPath: 'polygon(0 22.6%,100% 22.6%,100% 40.5%,44% 40.5%,44% 48.8%,100% 48.8%,100% 100%,21% 100%,21% 41.5%,0 41.5%)'}} />
    <Img src={asset('woman.png')} style={{...common, clipPath: 'inset(0 0 77.1% 0)', transformOrigin: '33% 22.8%', transform: `perspective(1000px) rotateY(${key(f, [155, 265], [0, -25])}deg) rotate(${headTurn}deg)`}} />
    <Img src={asset('woman.png')} style={{...common, clipPath: 'ellipse(6% 3.8% at 44% 45.7%)', transformOrigin: '44% 46%', transform: `rotate(${armLift / 2}deg)`}} />
    <Img src={asset('woman.png')} style={{...common, clipPath: 'polygon(43% 41.9%,61.5% 42%,70% 41.4%,77% 41.4%,83% 44%,86% 46.2%,82% 46.1%,76% 44.4%,69% 44.4%,61.5% 48%,43% 48.8%)', transformOrigin: '44% 46%', transform: `rotate(${armLift + Math.sin(f / 17) * .3}deg)`}} />
  </div>;
};

const Flame: React.FC<{frame: number}> = ({frame: f}) => {
  const agitation = key(f, [0, 80, 150, 225, 285], [.2, .45, .7, 1, 1.6]);
  const sway = (Math.sin(f * .47) * 3 + Math.sin(f * 1.17) * 1.6) * agitation;
  const out = key(f, [285, 289, 293], [1, .85, 0]);
  return <div style={{position: 'absolute', left: 712, top: 954, width: 58, height: 91, transformOrigin: '50% 100%', transform: `rotate(${sway * 1.5}deg) scale(${1 + Math.sin(f * .91) * .035},${out * (1 + Math.sin(f * .69) * .09 * agitation)})`, opacity: out}}>
    <svg width="58" height="91" viewBox="0 0 58 91">
      <defs>
        <radialGradient id="ember"><stop stopColor="#ffffdd"/><stop offset=".48" stopColor="#ffe896"/><stop offset="1" stopColor="#f59123"/></radialGradient>
        <filter id="fire-glow" x="-150%" y="-100%" width="400%" height="300%"><feGaussianBlur stdDeviation="5"/></filter>
      </defs>
      <path d={`M29 88 C3 70 13 47 ${29 + sway} 32 C${43 + sway} 16 33 8 32 1 C60 22 43 42 42 53 C67 70 43 86 29 88Z`} fill="#ff9e2b" opacity=".7" filter="url(#fire-glow)"/>
      <path d={`M29 88 C7 73 15 53 ${28 + sway} 37 C${42 + sway} 21 36 10 32 1 C54 22 43 39 39 54 C54 70 44 84 29 88Z`} fill="url(#ember)"/>
      <path d="M29 86 C15 75 26 64 31 51 C39 66 39 78 29 86Z" fill="#fffbe4"/>
    </svg>
  </div>;
};

const Shadow: React.FC<{frame: number}> = ({frame: f}) => {
  const presence = key(f, [142, 155, 180, 205, 240, 283], [0, .05, .48, .68, .78, .9]);
  return <div style={{position: 'absolute', left: 333, top: 440, width: 670, height: 1340, transformOrigin: '50% 93%', transform: `translateX(${key(f, [150, 280], [5, -25])}px) scale(${key(f, [145, 225, 287], [.82, 1, 1.09])})`, opacity: presence, mixBlendMode: 'multiply'}}>
    <Img src={asset('shadow.png')} style={{width: '100%', height: '100%', filter: `brightness(.09) blur(${key(f, [150, 260], [14, 3])}px)`, maskImage: 'linear-gradient(to bottom, black 65%, transparent 99%)'}}/>
  </div>;
};

const Eyes: React.FC<{frame: number}> = ({frame: f}) => {
  const presence = key(f, [177, 205, 245, 280, 292, 299], [0, .6, .76, 1, 1, 0]);
  return <div style={{position: 'absolute', left: 333, top: 440, width: 670, height: 1340, transformOrigin: '50% 93%', transform: `translateX(${key(f, [150, 280], [5, -25])}px) scale(${key(f, [145, 225, 287], [.82, 1, 1.09])})`, opacity: presence}}>
    <div style={{position: 'absolute', left: 259, top: 135, width: 7, height: 5, borderRadius: '50%', background: '#fff4b6', boxShadow: `0 0 8px 3px #ffad40, 0 0 ${key(f, [220, 289], [18, 31])}px 8px #e56c1b`}}/>
    <div style={{position: 'absolute', left: 294, top: 138, width: 7, height: 5, borderRadius: '50%', background: '#fff4b6', boxShadow: `0 0 8px 3px #ffad40, 0 0 ${key(f, [220, 289], [18, 31])}px 8px #e56c1b`}}/>
  </div>;
};

const Dust: React.FC<{frame: number}> = ({frame: f}) => <AbsoluteFill style={{pointerEvents: 'none'}}>
  {Array.from({length: 34}, (_, i) => <div key={i} style={{position: 'absolute', left: random(`x${i}`) * 1080 + Math.sin(f / 60 + i) * 12, top: (random(`y${i}`) * 1920 - f * (.1 + random(i) * .15) + 1920) % 1920, width: 1 + random(`s${i}`) * 2, height: 1 + random(`s${i}`) * 2, borderRadius: '50%', background: '#f9d79e', opacity: .09 + random(`o${i}`) * .16}} />)}
</AbsoluteFill>;

export const PaintedSet: React.FC<{frame: number; zoom: number; drift: number; handheld?: number}> = ({frame: f, zoom, drift, handheld = 0}) => {
  const flicker = 1 + (Math.sin(f * .53) * .028 + Math.sin(f * 1.31) * .018) * key(f, [0, 90, 225], [.3, 1, 2]);
  const extinguish = key(f, [285, 293], [1, .38]);
  return <AbsoluteFill style={{background: '#100a06', overflow: 'hidden'}}>
    <AbsoluteFill style={{transformOrigin: '40% 53%', transform: `translate(${drift + Math.sin(f * 1.23) * handheld}px,${Math.sin(f * .91) * handheld * .5}px) scale(${zoom})`}}>
      <Img src={asset('room.png')} style={{position: 'absolute', width: 1080, height: 1920, filter: `brightness(${.76 * flicker * extinguish}) saturate(.86)`, transform: `translateX(${-drift * .12}px) scale(1.018)`}} />
      <div style={{position: 'absolute', left: 80, top: 620, width: 1120, height: 1040, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,157,45,.13), transparent 65%)', opacity: flicker * extinguish, mixBlendMode: 'screen'}}/>
      <Shadow frame={f}/>
      <Eyes frame={f}/>
      <Img src={asset('chair.png')} style={{position: 'absolute', left: 95, top: 1018, width: 460, height: 605, filter: 'brightness(.3) saturate(.7)'}}/>
      <Woman frame={f}/>
      <Img src={asset('table.png')} style={{position: 'absolute', left: 345, top: 710, width: 600, height: 920, clipPath: 'inset(49% 0 0 0)', filter: `brightness(${.46 * flicker * Math.max(.55, extinguish)}) saturate(.8)`}}/>
      <Img src={asset('table.png')} style={{position: 'absolute', left: 345, top: 1007, width: 600, height: 300, clipPath: 'inset(0 0 45% 0)', filter: `brightness(${.62 * flicker * Math.max(.55, extinguish)}) saturate(.8)`}}/>
      <div style={{position: 'absolute', left: 585, top: 844, width: 310, height: 310, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,211,126,.28), rgba(255,148,35,.10) 32%, transparent 68%)', mixBlendMode: 'screen', opacity: flicker * key(f, [285, 293], [1, 0])}}/>
      <Flame frame={f}/>
      <Dust frame={f}/>
    </AbsoluteFill>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 52% 53%, transparent 29%, rgba(12,6,2,.12) 58%, rgba(5,3,2,.78) 100%)'}}/>
    <AbsoluteFill style={{background: 'linear-gradient(to bottom,rgba(8,5,3,.48),transparent 28%,transparent 72%,rgba(8,5,3,.75))'}}/>
  </AbsoluteFill>;
};
