import {useCurrentFrame} from 'remotion';
import {key, PaintedSet} from './art';
export const MediumShot = () => {
  const f = useCurrentFrame();
  return <PaintedSet frame={f + 75} zoom={key(f, [0, 74], [1.21, 1.265])} drift={key(f, [0, 74], [12, -7])}/>;
};
