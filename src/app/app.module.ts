import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginRepresentativeComponent } from './login-representative/login-representative.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { RegistrationRepresentativeComponent } from './registration-representative/registration-representative.component';
import { UserItemsComponent } from './user-items/user-items.component';
import {JwtInterceptor} from "./jwt.interceptor";
import { LoginBusinessComponent } from './login-business/login-business.component';
import { RegistrationBusinessComponent } from './registration-business/registration-business.component';
import { LoginComponent } from './login/login.component';
import { CreationStorageComponent } from './creation-storage/creation-storage.component';
import { CreationItemComponent } from './creation-item/creation-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageUploadComponent } from './image-upload/image-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginRepresentativeComponent,
    RegistrationRepresentativeComponent,
    UserItemsComponent,
    LoginBusinessComponent,
    RegistrationBusinessComponent,
    LoginComponent,
    CreationStorageComponent,
    CreationItemComponent,
    ImageUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
