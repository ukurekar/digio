import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';
import { LoginComponent } from './login/login.component'
import { MainComponent } from './main/main.component'

export const ROUTES: Routes = [
  { path: '',      component: LoginComponent },  
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent }  
];
