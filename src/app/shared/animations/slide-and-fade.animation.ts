import { animation, style, animate } from "@angular/animations";

export const slideAndFadeAnimation = animation([
    style({
        transform: "translateX(-100%)",
        opacity: "0",
        "background-color": " {{slideColor}} ",
    }),
    animate(
        "{{slideTime}} ease-out",
        style({
            transform: "translateX(0)",
            "background-color": "white",
            opacity: 1,
        })
    ),
]);
