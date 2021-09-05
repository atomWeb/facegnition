import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { ValidateComponent } from './validate/validate.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  { path: '', redirectTo: 'validate', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'validate', component: ValidateComponent },
  { path: 'list-users', component: ListUsersComponent },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
