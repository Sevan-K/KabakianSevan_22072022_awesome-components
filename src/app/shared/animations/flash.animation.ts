import { animation, sequence, style, animate } from "@angular/animations";

export const flashAnimation = animation([
    sequence([
        animate(
            "{{flashTime}} ease-out",
            style({
                "background-color": "{{flashColor}}",
            })
        ),
        animate(
            "{{flashTime}} ease-out",
            style({
                "background-color": "white",
            })
        ),
    ]),
]);
