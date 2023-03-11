import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";
import {BusinessRegistrationForm} from "../model/business-registration-form";

@Component({
  selector: 'app-registration-business',
  templateUrl: './registration-business.component.html',
  styleUrls: ['./registration-business.component.scss']
})
export class RegistrationBusinessComponent implements OnInit {
  registrationFormHolder : BusinessRegistrationForm = {
    name: "",
    password: "",
  }

  registrationForm: FormGroup = new FormGroup({
    "name": new FormControl(this.registrationFormHolder.name, [Validators.required]),
    "password": new FormControl(this.registrationFormHolder.password, [Validators.required]),
  });


  constructor(private service: AuthenticationService, private route: Router) {}
  ngOnInit(): void {}

  submit() {
    this.registrationFormHolder.name = this.registrationForm.get("name")!.value
    this.registrationFormHolder.password = this.registrationForm.get("password")!.value

    this.service.registerBusiness(this.registrationFormHolder).subscribe((response: any) => {
      this.route.navigate(["/login"]).then();
    });
  }
}
