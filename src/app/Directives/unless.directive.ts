import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]',
  standalone: true
})
export class UnlessDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  @Input() set appUnless(condition: boolean) {
    // If the condition is FALSE, we SHOW the element (this is the opposite of ngIf!)
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    }
    // If the condition is TRUE, we HIDE the element
    else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}


// task 3 logic
// Hint 1: The HTML Structure
// You'll want your HTML to look somewhat like this. Notice how we are binding the selected color to a variable, and then passing that same variable into the custom directive on the <p> tag!

// html
// <!-- The Radio Buttons -->
// <input type="radio" name="color" value="green" [(ngModel)]="selectedColor"> Green
// <input type="radio" name="color" value="yellow" [(ngModel)]="selectedColor"> Yellow
// <input type="radio" name="color" value="red" [(ngModel)]="selectedColor"> Red
// <!-- The Paragraph with your Custom Directive -->
// <p [appHoverColor]="selectedColor">
//   Hover over me to see the color change!
// </p>
// Hint 2: Catching the Input in the Directive
// Inside your custom directive, you need to grab that selectedColor value so the directive knows what color to use.

// typescript
// @Input() appHoverColor = ''; // This will receive 'green', 'yellow', 'red', or ''
// Hint 3: Listening to the Mouse
// To know when the user's mouse enters or leaves the <p> tag, you don't need to write manual addEventListener code. Angular has a built-in decorator for directives called @HostListener.

// typescript
// @HostListener('mouseenter') onMouseEnter() {
//   // Logic for when the mouse enters the paragraph
//   // Check if this.appHoverColor exists. If yes -> apply it. If no -> apply 'black'
// }
// @HostListener('mouseleave') onMouseLeave() {
//   // Logic for when the mouse leaves the paragraph
//   // Reset the color back to normal
// }
// Hint 4: Changing the Element's Color
// To actually change the color of the <p> tag from inside the directive, you need to inject ElementRef in your constructor. This gives the directive access to the actual DOM element it is sitting on.

// typescript
// constructor(private el: ElementRef) { }
// // Inside your HostListeners, you can change the color like this:
// // this.el.nativeElement.style.color = 'red';