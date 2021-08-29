// BOUNCER
// player needs to bounce back the bouncing square
// every bounce back score increase
// win condition: score go up to 10
// loose condition: bouncing square touches the ground

import Display from './lib/Display';

/**
 * display initialize
 * here we have a canvas on the DOM
 */
const display = new Display({
  canvas: document.querySelector('#display'),
  width: 832,
  height: 640,
});

export default () => {
  display.context.font = `60px pressStart`;
  display.context.fillStyle = 'white';
  display.context.textAlign = 'center';
  display.context.fillText(
    'Hello World',
    display.width / 2,
    display.height / 2
  );
};
