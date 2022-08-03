import { animation, style, animate } from '@angular/animations';

export const slideAndFadeAnimation = animation([
  style({
    transform: 'translateX(-100%)',
    opacity: '0',
    'background-color': 'rgb(201,157,242)',
  }),
  animate(
    '250ms ease-out',
    style({
      transform: 'translateX(0)',
      'background-color': 'white',
      opacity: 1,
    })
  ),
]);
