import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {RepresentativeRegistrationForm} from "../model/representative-registration-form";

@Component({
  selector: 'app-registration-representative',
  templateUrl: './registration-representative.component.html',
  styleUrls: ['./registration-representative.component.scss']
})
export class RegistrationRepresentativeComponent implements OnInit {
  registrationFormHolder : RepresentativeRegistrationForm = {
    username: "",
    password: "",
  }

  registrationForm: FormGroup = new FormGroup({
    "username": new FormControl(this.registrationFormHolder.username, [Validators.required]),
    "password": new FormControl(this.registrationFormHolder.password, [Validators.required]),
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

    this.service.registerRepresentative(this.registrationFormHolder).subscribe((response: any) => {
      this.route.navigate(["/login"]).then();
    });
  }


}
