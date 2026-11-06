import {useCurrentFrame} from 'remotion';
import {key, PaintedSet} from './art';
export const TensionShot = () => {
  const f = useCurrentFrame();
  return <PaintedSet frame={f + 225} zoom={key(f, [0, 42, 65, 74], [1.43, 1.49, 1.58, 1.6])} drift={key(f, [0, 74], [-12, 5])} handheld={.75}/>;
};
