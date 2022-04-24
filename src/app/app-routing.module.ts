import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { OwnerGuard } from './guards/isOwner.guard';

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
import { MyProfileComponent } from './components/my-profile/my-profile.component';

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
    path: 'my-profile',
    component: MyProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'beegardens/list',
    component: BeeGardensComponent
  },
  {
    path: 'beegardens/:id',
    component: BeehivesComponent
  },
  {
    path: 'addbeegardens',
    component: AddBeegardenComponent,
    canActivate: [OwnerGuard]
  },
  {
    path: 'beegardens/:id/addbeehive',
    component: AddBeehiveComponent,
    canActivate: [OwnerGuard]
  },
  {
    path: 'beegardens/:id/beehives/:id',
    component: BeehivesDataComponent,
    canActivate: [OwnerGuard]
  },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
