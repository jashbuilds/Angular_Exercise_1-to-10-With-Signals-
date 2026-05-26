import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-address-field',
  imports: [FormsModule],
  templateUrl: './address-field.component.html',
  styleUrl: './address-field.component.css'
})
export class AddressFieldComponent {

  cityInput = signal('')
  stateInput = signal('')
  pincodeInput = signal<string | null>(null)

  isAddressValid() {
    return this.cityInput() !== '' && this.stateInput() !== '' && this.pincodeInput() !== '';
  }

  preventChars(event: KeyboardEvent) {
    if (/^\d+$/.test(event.key)) {
      return;
    }
    event.preventDefault();
  }

}
