import { Routes } from '@angular/router';
import { LabsComponent } from '../app/pages/labs/labs.component';
import { HomeComponent } from '../app/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'labs',
    component: LabsComponent,
  },
];
