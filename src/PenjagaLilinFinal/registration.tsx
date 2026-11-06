import {Composition, Folder} from 'remotion';
import {PenjagaLilinFinal} from './index';
import {WideShot} from './WideShot';
import {MediumShot} from './MediumShot';
import {RevealShot} from './RevealShot';
import {TensionShot} from './TensionShot';

export const PenjagaFinalCompositions = () => <>
  <Composition id="PenjagaLilinFinal" component={PenjagaLilinFinal} durationInFrames={300} fps={30} width={1080} height={1920}/>
  <Folder name="Penjaga-Final-Scenes">
    <Composition id="PenjagaFinal-Wide" component={WideShot} durationInFrames={75} fps={30} width={1080} height={1920}/>
    <Composition id="PenjagaFinal-Medium" component={MediumShot} durationInFrames={75} fps={30} width={1080} height={1920}/>
    <Composition id="PenjagaFinal-Reveal" component={RevealShot} durationInFrames={75} fps={30} width={1080} height={1920}/>
    <Composition id="PenjagaFinal-Tension" component={TensionShot} durationInFrames={75} fps={30} width={1080} height={1920}/>
  </Folder>
</>;
