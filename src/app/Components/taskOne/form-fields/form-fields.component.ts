import { Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AddressFieldComponent } from "./address-field/address-field.component";
import { CustomerData } from './formfields.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-form-fields',
  imports: [FormsModule, AddressFieldComponent],
  templateUrl: './form-fields.component.html',
  styleUrl: './form-fields.component.css'
})
export class FormFieldsComponent {
  formModal = viewChild<ElementRef>('formInputModal');
  regExp = /^\d+$/

  constructor() {
    effect(() => {
      const modalEl = this.formModal()?.nativeElement;
      if (modalEl) {
        modalEl.addEventListener('hidden.bs.modal', () => {
          this.onModalClose();
        });
      }
    });
  }

  addressField = viewChild(AddressFieldComponent);
  customerData = signal<CustomerData[]>([])

  nameInput = signal('')
  emailInput = signal('')

  onSubmit(form: NgForm) {

    this.customerData.update((data) => [...data, {
      name: this.nameInput(),
      email: this.emailInput(),
      address: {
        city: this.addressField()?.cityInput() || '',
        state: this.addressField()?.stateInput() || '',
        pincode: this.addressField()?.pincodeInput() || ''
      }
    }]);
    console.log(this.customerData());
    form.reset()
    
  }

  isFormValid() {
    return this.nameInput() !== '' && this.emailInput() !== '' && this.addressField()?.isAddressValid();
  }

  onModalClose() {
    this.nameInput.set('')
    this.emailInput.set('')
    this.addressField()?.cityInput.set('')
    this.addressField()?.stateInput.set('')
    this.addressField()?.pincodeInput.set(null)
  }

}
