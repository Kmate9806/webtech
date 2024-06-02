import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RenterListComponent } from './renter-list/renter-list.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { LoginComponent } from './login/login.component';
import { RegistComponent } from './regist/regist.component';

@NgModule({
  declarations: [
    AppComponent,
    RenterListComponent,
    VehicleListComponent,
    LoginComponent,
    RegistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
