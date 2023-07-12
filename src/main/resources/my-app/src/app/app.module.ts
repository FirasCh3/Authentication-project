import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import {httpRequests} from "./http";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./auth/AuthGuardService";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [httpRequests,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
