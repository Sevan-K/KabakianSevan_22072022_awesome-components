import { animation, sequence, style, animate } from '@angular/animations';

export const flashAnimation = animation([
  sequence([
    animate(
      '100ms ease-out',
      style({
        'background-color': 'rgb(201,157,242)',
      })
    ),
    animate(
      '250ms ease-in',
      style({
        'background-color': 'white',
      })
    ),
  ]),
]);
