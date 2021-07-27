import globalConfig from './global.config';
import Display from '../lib/Display';

let { display } = globalConfig;
export default new Display({
  canvas: document.querySelector('app-game').canvas,
  height: display.height,
  width: display.width,
});
