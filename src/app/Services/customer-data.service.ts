import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  constructor() { }

  customerData = signal<any[]>([]);
}
