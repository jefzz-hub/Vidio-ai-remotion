import {useCurrentFrame} from 'remotion';
import {key, PaintedSet} from './art';
export const WideShot = () => {
  const f = useCurrentFrame();
  return <PaintedSet frame={f} zoom={key(f, [0, 74], [1, 1.065])} drift={key(f, [0, 74], [0, -3])}/>;
};
