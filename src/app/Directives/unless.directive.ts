import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]',
  standalone: true
})
export class UnlessDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<HTMLDivElement>,
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
