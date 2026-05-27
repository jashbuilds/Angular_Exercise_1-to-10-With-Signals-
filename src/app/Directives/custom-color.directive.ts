import { Directive, ElementRef, HostListener, input } from '@angular/core';

@Directive({
  selector: '[appCustomColor]'
})
export class CustomColorDirective {

  constructor(private el: ElementRef) { }

  appHoverColor = input<string>()

  @HostListener('mouseenter') onMouseEnter() {
    this.changeColor(this.appHoverColor() || 'black');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeColor('black');
  }
  
  private changeColor(color: string) {
    this.el.nativeElement.style.color = color;
  }

}
