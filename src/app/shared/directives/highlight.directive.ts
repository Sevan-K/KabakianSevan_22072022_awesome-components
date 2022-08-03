import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

// directive decorator is needed
@Directive({
  selector: '[hightlight]',
})

// a directive is also a class
export class HightLightDirective implements AfterViewInit {
  // a directive can take an input just like a component
  // if the input name is the same as the directive no other attribute is necessary but the default value can't be used
  @Input() color: string = 'yellow';
  colorUsed!: string;

  // element ref is used top connect to dom element where directive is applied
  // the renderer allow us to interact with the native element
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  // to be sure the view exist
  ngAfterViewInit() {
    this.setBackGroundColor(this.color);
    this.colorUsed = this.color;
  }

  //   method to set background-color
  setBackGroundColor(color: string) {
    this.renderer.setStyle(
      this.element.nativeElement,
      'background-color',
      color
    );
  }

  // decorator to listen to event on host (of the directive)
  @HostListener('mouseenter') onMouseEnter() {
    this.setBackGroundColor(
      this.color === this.colorUsed ? 'lightgreen' : this.color
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBackGroundColor(this.colorUsed);
  }

  @HostListener('click') onMouseClick() {
    this.colorUsed = this.color === this.colorUsed ? 'lightgreen' : this.color;
  }
}
