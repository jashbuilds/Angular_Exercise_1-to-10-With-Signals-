import { Component, computed, effect, signal, viewChild } from '@angular/core';
import { FormFieldsComponent } from '../form-fields/form-fields.component';
import { CustomerDataService } from '../../../Services/customer-data.service';
import { AddressFieldComponent } from '../form-fields/address-field/address-field.component';
import { FormsModule } from '@angular/forms';
import { UnlessDirective } from '../../../Directives/unless.directive';

@Component({
  selector: 'app-customer-data',
  imports: [FormFieldsComponent, AddressFieldComponent, FormsModule, UnlessDirective],
  templateUrl: './customer-data.component.html',
  styleUrl: './customer-data.component.css'
})
export class CustomerDataComponent {

  filteredCustomerData = computed(() => {
    const status = this.selectStatus().toLowerCase();
    const data = this.customerService.customerData();

    if (status === 'all') return data;

    return data.filter(customer =>
      customer.status.toLowerCase() === status
    );
  });

  formComponent = viewChild(FormFieldsComponent);
  addressComponent = viewChild(AddressFieldComponent);
  currentEditId = signal<number | string | null>(null);

  isSortedByName = signal(false);
  selectStatus = signal<'all' | 'active' | 'inactive'>('all');

  constructor(public customerService: CustomerDataService) { }

  nameEditInput = signal('');
  emailEditInput = signal('');
  statusEditInput = signal('Active');

  onCustomerAdded() {
    console.log("Customer Added");
    console.log(this.customerService.customerData());
  }

  onEditCustomer(data: any) {
    this.currentEditId.set(data.id)
    this.nameEditInput.set(data.name);
    this.emailEditInput.set(data.email);
    this.statusEditInput.set(data.status);
    this.addressComponent()?.cityInput.set(data.address.city);
    this.addressComponent()?.stateInput.set(data.address.state);
    this.addressComponent()?.pincodeInput.set(data.address.pincode);
  }

  onUpdateCustomer() {
    this.customerService.customerData.update((data) =>
      data.map((customer) => {
        if (customer.id === this.currentEditId()) {
          return {
            ...customer,
            name: this.nameEditInput(),
            email: this.emailEditInput(),
            address: {
              city: this.addressComponent()?.cityInput() || '',
              state: this.addressComponent()?.stateInput() || '',
              pincode: this.addressComponent()?.pincodeInput() || ''
            },
            status: this.statusEditInput(),
          }
        }
        return customer;
      }
      ));
  }

  sortState = signal<'none' | 'asc' | 'desc'>('none');

  sortByName() {

    const currentState = this.sortState();

    if (currentState === 'asc') {
      this.customerService.customerData.update((data) =>
        [...data].sort((a, b) => b.name.localeCompare(a.name))
      );
      this.sortState.set('desc');
    } else {
      this.customerService.customerData.update((data) =>
        [...data].sort((a, b) => a.name.localeCompare(b.name))
      );
      this.sortState.set('asc');

    }
  }

  filterByStatus(status: string) {
    console.log(status);

    const selectedStatus = this.selectStatus();
    if (selectedStatus === 'all') {
      return this.customerService.customerData();
    }
    return this.customerService.customerData().filter(customer => customer.status === selectedStatus);
  }
}
