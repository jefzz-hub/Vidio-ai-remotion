import {useCurrentFrame} from 'remotion';
import {key, PaintedSet} from './art';
export const RevealShot = () => {
  const f = useCurrentFrame();
  return <PaintedSet frame={f + 150} zoom={key(f, [0, 74], [1.285, 1.42])} drift={key(f, [0, 74], [-7, -12])} handheld={.45}/>;
};
