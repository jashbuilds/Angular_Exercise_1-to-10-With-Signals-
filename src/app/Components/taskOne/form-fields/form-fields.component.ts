import { Component, effect, ElementRef, output, signal, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AddressFieldComponent } from "./address-field/address-field.component";
import { CustomerData } from '../../../Models/formfields.model';
import { CharsOnlyDirective } from '../../../Directives/chars-only.directive';
import { CustomerDataService } from '../../../Services/customer-data.service';

@Component({
  selector: 'app-form-fields',
  imports: [FormsModule, AddressFieldComponent, CharsOnlyDirective],
  templateUrl: './form-fields.component.html',
  styleUrl: './form-fields.component.css'
})
export class FormFieldsComponent {
  formModal = viewChild<ElementRef>('formInputModal');
  regExp = /^\d+$/

  ngForm = viewChild(NgForm);

  constructor(private customerDataService: CustomerDataService) {
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
  statusInput = signal('Active')


  dataAdded = output()

  onSubmit(form: NgForm) {

    this.customerDataService.customerData.update((data) => [...data, {
      id: Date.now(),
      name: this.nameInput(),
      email: this.emailInput(),
      address: {
        city: this.addressField()?.cityInput() || '',
        state: this.addressField()?.stateInput() || '',
        pincode: this.addressField()?.pincodeInput() || ''
      },
      status: this.statusInput(),
    }]);
    this.dataAdded.emit();
    form.resetForm();
  }

  onModalClose() {
    this.ngForm()?.resetForm();
    this.nameInput.set('')
    this.emailInput.set('')
    this.addressField()?.cityInput.set('')
    this.addressField()?.stateInput.set('')
    this.addressField()?.pincodeInput.set('')
  }

  isEmailValid() {
    const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegExp.test(this.emailInput());
  }

}
