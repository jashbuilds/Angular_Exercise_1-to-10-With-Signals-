import { Routes } from '@angular/router';
import { CustomerDataComponent } from './Components/taskOne/customer-data/customer-data.component';
import { RadioGrpComponent } from './Components/taskThree/radio-grp/radio-grp.component';

export const routes: Routes = [
    {
        path: 'task-one', component: CustomerDataComponent
    },
    {
        path: 'task-three', component: RadioGrpComponent
    }
];
