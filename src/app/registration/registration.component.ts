import { Component, OnInit } from '@angular/core';
import {RegistrationForm} from "../model/registration-form";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationFormHolder : RegistrationForm = {
    username: "",
    password: "",
    authorities: []
  }

  registrationForm: FormGroup = new FormGroup({
    "username": new FormControl(this.registrationFormHolder.username, [Validators.required]),
    "password": new FormControl(this.registrationFormHolder.password, [Validators.required]),
    "authority": new FormControl(this.registrationFormHolder.authorities),
  });


  constructor(private service: AuthenticationService, private route: Router) {}
  ngOnInit(): void {
    if (this.service.getCurrentUserValue) {
      this.route.navigate(["/home"]).then();
    }
  }

  submit() {
    this.registrationFormHolder.username = this.registrationForm.get("username")!.value
    this.registrationFormHolder.password = this.registrationForm.get("password")!.value
    var authority = this.registrationForm.get("authority")!.value.toUpperCase().replace(" ", "_");
    this.registrationFormHolder.authorities.push(authority);

    this.service.register(this.registrationFormHolder).subscribe((response: any) => {
      this.route.navigate(["/login"]).then();
    });
  }


}
