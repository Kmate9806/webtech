import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';

const routes: Routes = [
  {
    path: '',
    component: VehicleListComponent
  },
  {
    path: 'vehicle-form',
    component: VehicleFormComponent
  },
  {
    path: 'vehicle-form/:id',
    component: VehicleFormComponent
  },
  {
    path: 'user-list',
    component: UserListComponent
  },
  {
    path: 'user-form',
    component: UserFormComponent
  },
  {
    path: 'user-form/:id',
    component: UserFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
