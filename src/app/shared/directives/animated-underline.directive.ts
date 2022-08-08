import {
    AfterViewInit,
    Directive,
    ElementRef,
    HostListener,
    Input,
    Renderer2,
} from "@angular/core";

@Directive({
    selector: "[animated-underline]",
})
export class AnimatedUnderlineDirective implements AfterViewInit {
    @Input() color: string = "rgba(175, 122, 197,50%)";
    backgroundPositionY: string = "calc(200% - 1px)";
    activeBackgroundPositionY!: string;
    // wantedStyles!: { [key: string]: string };

    constructor(private element: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit(): void {
        this.activeBackgroundPositionY = this.backgroundPositionY;
        this.setUnderlineStyle(this.color, this.activeBackgroundPositionY);
    }

    setUnderlineStyle(color: string, backgroundPositionY: string) {
        const wantedStyles: { [key: string]: string } = {
            "background-image": `linear-gradient(0deg, ${color}, ${color} 100%)`,
            "background-repeat": "no-repeat",
            "background-size": "100% 50%",
            "background-position-y": backgroundPositionY,
            transition: "background-position-y 0.25s ease 0s",
        };

        Object.keys(wantedStyles).forEach((wantedStyle) =>
            this.renderer.setStyle(
                this.element.nativeElement,
                `${wantedStyle}`,
                `${wantedStyles[wantedStyle]}`
            )
        );
    }

    @HostListener("mouseenter") onMouseEnter() {
        this.setUnderlineStyle(
            this.color,
            this.activeBackgroundPositionY === this.backgroundPositionY
                ? "100%"
                : this.backgroundPositionY
        );
    }

    @HostListener("mouseleave") onMouseLeave() {
        this.setUnderlineStyle(this.color, this.activeBackgroundPositionY);
    }

    @HostListener("click") onClick() {
        this.activeBackgroundPositionY =
            this.activeBackgroundPositionY === this.backgroundPositionY
                ? "100%"
                : this.backgroundPositionY;
    }
}
