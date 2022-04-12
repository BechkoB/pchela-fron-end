import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged-in.guard';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BeeGardensComponent } from './components/beegardens/beegardens.component';
import { BeehivesComponent } from './components/beehives/beehives.component';
import { AddBeegardenComponent } from './components/add-beegarden/add-beegarden.component';
import { AddBeehiveComponent } from './components/add-beehive/add-beehive.component';
import { BeehivesDataComponent } from './components/beehives-data/beehives-data.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'beegardens/list',
    component: BeeGardensComponent
  },
  {
    path: 'beegardens/:id',
    component: BeehivesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addbeegardens',
    component: AddBeegardenComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'beegardens/:id/addbeehive',
    component: AddBeehiveComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'beegardens/:id/beehives/:id',
    component: BeehivesDataComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
