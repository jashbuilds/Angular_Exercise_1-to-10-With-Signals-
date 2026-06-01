import { Component, signal } from '@angular/core';
import { FormsModule, ControlContainer, NgForm } from '@angular/forms';
import { CharsOnlyDirective } from '../../../../Directives/chars-only.directive';

@Component({
  selector: 'app-address-field',
  imports: [FormsModule, CharsOnlyDirective],
  templateUrl: './address-field.component.html',
  styleUrl: './address-field.component.css',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class AddressFieldComponent {

  cityInput = signal('')
  stateInput = signal('')
  pincodeInput = signal<string | number>('')

  isAddressValid() {
    return this.cityInput() !== '' && this.stateInput() !== '' && this.pincodeInput() !== null && this.pincodeInput() !== '';
  }

  preventChars(event: KeyboardEvent) {
    if (/^\d+$/.test(event.key)) {
      return;
    }
    event.preventDefault();
  }

}
