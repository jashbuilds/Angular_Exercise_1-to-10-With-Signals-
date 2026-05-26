import { Component } from '@angular/core';
import { FormFieldsComponent } from "./Components/taskOne/form-fields/form-fields.component";
import { NavbarComponent } from "./Components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [FormFieldsComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
