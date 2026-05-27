import { Component } from '@angular/core';
import { FormFieldsComponent } from "./Components/taskOne/form-fields/form-fields.component";
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { RadioGrpComponent } from './Components/taskThree/radio-grp/radio-grp.component';
import { CustomerDataComponent } from "./Components/taskOne/customer-data/customer-data.component";

@Component({
  selector: 'app-root',
  imports: [FormFieldsComponent, NavbarComponent, RadioGrpComponent, CustomerDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
