import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[charsOnly]',
  standalone: true
})
export class CharsOnlyDirective {

  constructor() { }

  regExp = /^[a-zA-Z\s]+$/

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    // Allow control keys (Backspace, Delete, Arrows, Tab, etc.)
    const allowedKeys = [
      'Backspace', 'Tab', 'Enter', 'Escape', 'Delete', 
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 
      'Home', 'End'
    ];
    
    if (allowedKeys.includes(e.key)) {
      return;
    }

    // Allow keyboard shortcuts (Ctrl+A, Ctrl+C, Ctrl+V, etc.)
    if (e.ctrlKey || e.metaKey) {
      return;
    }

    // Check if the typed key matches the allowed characters (letters and spaces only)
    if (this.regExp.test(e.key)) {
      return;
    }
    
    // Prevent anything else (numbers and special chars)
    e.preventDefault();
  }

}
