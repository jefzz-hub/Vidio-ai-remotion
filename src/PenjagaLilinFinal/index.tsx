import React from 'react';
import {AbsoluteFill, Audio, Series, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {asset, key} from './art';
import {WideShot} from './WideShot';
import {MediumShot} from './MediumShot';
import {RevealShot} from './RevealShot';
import {TensionShot} from './TensionShot';
import {originalAtmosphere} from './audio-config';

export const PenjagaLilinFinal: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return <AbsoluteFill style={{background: '#0b0704', color: '#f2dfbd'}}>
    <style>{`@font-face{font-family:PenjagaSerif;src:url('${asset('Serif.ttf')}')}@font-face{font-family:PenjagaSerif;src:url('${asset('SerifItalic.ttf')}');font-style:italic}`}</style>
    <Series>
      <Series.Sequence name="01 — Sunyi sebelum gangguan" durationInFrames={2.5 * fps} premountFor={fps}><WideShot/></Series.Sequence>
      <Series.Sequence name="02 — Lilin mulai gelisah" durationInFrames={2.5 * fps} premountFor={fps}><MediumShot/></Series.Sequence>
      <Series.Sequence name="03 — Bayangan muncul" durationInFrames={2.5 * fps} premountFor={fps}><RevealShot/></Series.Sequence>
      <Series.Sequence name="04 — Bukan bayangannya" durationInFrames={2.5 * fps} premountFor={fps}><TensionShot/></Series.Sequence>
    </Series>
    <AbsoluteFill style={{pointerEvents: 'none', opacity: .045, mixBlendMode: 'soft-light', transform: `translate(${(f % 4) * 3}px,${(f % 3) * 3}px)`}}>
      <svg width="1100" height="1940"><defs><filter id="film-grain"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" stitchTiles="stitch"/></filter></defs><rect width="1100" height="1940" filter="url(#film-grain)" opacity=".8"/></svg>
    </AbsoluteFill>
    <div data-safe-title style={{position: 'absolute', top: 164, left: 90, right: 90, textAlign: 'center', opacity: key(f, [0, 22, 65, 86], [0, 1, 1, 0]), transform: `translateY(${key(f, [0, 50], [10, 0])}px)`, textShadow: '0 3px 20px #100905', fontFamily: 'PenjagaSerif, serif'}}>
      <div style={{fontFamily: 'sans-serif', fontSize: 21, letterSpacing: 7, opacity: .62, marginBottom: 26}}>SEBUAH KISAH DALAM GELAP</div>
      <div style={{fontSize: 69, letterSpacing: 4, lineHeight: 1.2}}>PENJAGA LILIN</div>
      <div style={{width: 100, height: 1, background: '#bb8b49', margin: '27px auto'}}/>
    </div>
    <div data-safe-subtitle style={{position: 'absolute', left: 110, right: 110, bottom: 215, textAlign: 'center', fontFamily: 'PenjagaSerif, serif', fontStyle: 'italic', fontSize: 45, lineHeight: 1.45, textShadow: '0 2px 16px #000, 0 2px 6px #000', opacity: key(f, [242, 257, 288, 299], [0, 1, 1, 0]), transform: `translateY(${key(f, [242, 265], [9, 0])}px)`}}>
      Tapi bayangan itu…<br/><span style={{fontSize: 53, color: '#fff0cd'}}>bukan miliknya.</span>
    </div>
    <AbsoluteFill style={{pointerEvents: 'none', background: '#050302', opacity: key(f, [0, 12, 293, 299], [.5, 0, 0, 1])}}/>
    {originalAtmosphere ? <Audio src={staticFile(originalAtmosphere)} volume={1} /> : null}
  </AbsoluteFill>;
};
