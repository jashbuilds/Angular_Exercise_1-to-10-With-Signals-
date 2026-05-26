import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[charsOnly]'
})
export class CharsOnlyDirective {

  constructor() { }

  regExp = /^[a-zA-Z\s]+$/

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if(this.regExp.test(e.key)) {
      return
    }
    e.preventDefault()
  }

}
