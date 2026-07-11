import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TutorialesComponent } from './tutoriales.component';

export const TUTORIALES_ROUTES: Routes = [
  {
    path: '',
    component: TutorialesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(TUTORIALES_ROUTES)],
  exports: [RouterModule],
})
export class TutorialesRoutingModule { }