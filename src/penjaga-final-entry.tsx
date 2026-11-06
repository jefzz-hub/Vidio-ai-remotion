import {registerRoot} from 'remotion';
import {PenjagaFinalCompositions} from './PenjagaLilinFinal/registration';
// Independent entry keeps legacy compositions available even if they use another Root.
registerRoot(PenjagaFinalCompositions);
