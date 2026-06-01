import { Injectable, signal } from '@angular/core';
import { CustomerData } from '../Models/formfields.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  constructor() { }

  customerData = signal<CustomerData[]>([]);
}
