import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegistrationRepresentativeComponent} from "./registration-representative/registration-representative.component";
import {UserItemsComponent} from "./user-items/user-items.component";
import {RegistrationBusinessComponent} from "./registration-business/registration-business.component";
import {LoginComponent} from "./login/login.component";
import {CreationStorageComponent} from "./creation-storage/creation-storage.component";
import {CreationItemComponent} from "./creation-item/creation-item.component";
import {ImageUploadComponent} from "./image-upload/image-upload.component";

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "creation-storage/:id", component:CreationStorageComponent},
  {path: "creation-item/:id", component:CreationItemComponent},
  {path: "registration-business", component: RegistrationBusinessComponent},
  {path: "registration-representative", component: RegistrationRepresentativeComponent},
  {path: "items", component: UserItemsComponent},
  {path: "images", component: ImageUploadComponent},
  {path: "**", redirectTo: "/home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
