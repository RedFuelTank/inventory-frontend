import { Component } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {LoginRequest} from "../model/login-request";
import {LoginResponse} from "../model/login-response";

@Component({
  selector: 'app-login-business',
  templateUrl: './login-business.component.html',
  styleUrls: ['./login-business.component.scss']
})
export class LoginBusinessComponent {
  loginForm!: UntypedFormGroup;
  private returnUrl!: string;

  constructor(private formBuilder: UntypedFormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    if (this.authenticationService.getCurrentUserValue) {
      this.router.navigate(["/home"]).then();
    }
    this.loginForm = this.formBuilder.group({
      name: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/home"
  }

  public onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value)
    const {name, password} = this.loginForm.value
    let loginRequest = new LoginRequest(name, password);
    console.log(loginRequest)

    this.authenticationService.loginAsBusiness(loginRequest).subscribe((response: LoginResponse) => {
      this.router.navigate([this.returnUrl])
    });
  }
}
