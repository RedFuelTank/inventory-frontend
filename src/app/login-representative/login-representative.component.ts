import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {LoginResponse} from "../model/login-response";
import {LoginRequest} from "../model/login-request";

@Component({
  selector: 'app-login-representative',
  templateUrl: './login-representative.component.html',
  styleUrls: ['./login-representative.component.scss']
})
export class LoginRepresentativeComponent implements OnInit {
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
      username: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/home"
  }

  public onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value)
    const {username, password} = this.loginForm.value
    let loginRequest = new LoginRequest(username, password);
    console.log(loginRequest)

    this.authenticationService.loginAsRepresentative(loginRequest).subscribe((response: LoginResponse) => {
      this.router.navigate([this.returnUrl])
    });
  }
}
