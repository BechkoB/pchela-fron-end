import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RandomColorPipe } from './pipes/random-color.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { BeeGardensComponent } from './components/beegardens/beegardens.component';
import { BeehivesComponent } from './components/beehives/beehives.component';
import { AddBeegardenComponent } from './components/add-beegarden/add-beegarden.component';
import { AddBeehiveComponent } from './components/add-beehive/add-beehive.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { HivesDataComponent } from './components/hives-data/hives-data.component';
import { HivesDataReportComponent } from './components/hives-data/hives-data-report/hives-data-report.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavMenuComponent,
    BeeGardensComponent,
    BeehivesComponent,
    AddBeegardenComponent,
    AddBeehiveComponent,
    ConfirmDialogComponent,
    RandomColorPipe,
    NotFoundComponent,
    HomeComponent,
    MyProfileComponent,
    HivesDataComponent,
    HivesDataReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{ provide: HivesDataComponent }, { provide: BeehivesComponent }],
  entryComponents: [ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
