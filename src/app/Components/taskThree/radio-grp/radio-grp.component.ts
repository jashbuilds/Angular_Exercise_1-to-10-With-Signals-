import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomColorDirective } from '../../../Directives/custom-color.directive';

@Component({
  selector: 'app-radio-grp',
  imports: [FormsModule, CustomColorDirective],
  templateUrl: './radio-grp.component.html',
  styleUrl: './radio-grp.component.css'
})
export class RadioGrpComponent {
  selectedOption = signal('default');
}
