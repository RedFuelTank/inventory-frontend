import { Component } from '@angular/core';
import {LoginResponse} from "./model/login-response";
import {AuthenticationService} from "./authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'inventory';

  constructor(private authenticationService : AuthenticationService) {
  }

  public get getCurrentValue(): LoginResponse | undefined {
    return this.authenticationService.getCurrentUserValue
  }

  logout() {
    this.authenticationService.logout()
  }
}
