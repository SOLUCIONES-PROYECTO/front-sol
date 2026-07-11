import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPassword } from './reset-password/reset-password';

const routes: Routes = [
  {
    path:'login',
    loadChildren:()=>import('./login/login.module').then(m=>m.LoginModule)
  },
  {
    path:'register',
    loadChildren:()=>import('./register/register.module').then(m=>m.RegisterModule)
  },
  {
    path: 'reset-password',
    component: ResetPassword
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
