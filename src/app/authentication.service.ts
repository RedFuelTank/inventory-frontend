import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {Authority, LoginResponse} from "./model/login-response";
import {UserService} from "./user.service";
import {LoginRequest} from "./model/login-request";
import {map} from "rxjs/operators";
import {BusinessRegistrationForm} from "./model/business-registration-form";
import {RepresentativeRegistrationForm} from "./model/representative-registration-form";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<LoginResponse | undefined>;
  public currentUser: Observable<LoginResponse | undefined>;

  constructor(private userService : UserService, private router: Router) {
    const currentUserString = localStorage.getItem("currentUser");
    const currentUserJson = currentUserString ? JSON.parse(currentUserString) : undefined;
    this.currentUserSubject = new BehaviorSubject(currentUserJson)
    this.currentUser = this.currentUserSubject.asObservable();
  }

  loginAsRepresentative(loginRequest: LoginRequest) : Observable<LoginResponse>{
    return this.userService.loginAsRepresentative(loginRequest).pipe(
      map((response : LoginResponse) => {
        localStorage.setItem("currentUser", JSON.stringify(response));
        this.currentUserSubject.next(response);
        return response;
      })
    )
  }

  loginAsBusiness(loginRequest: LoginRequest) : Observable<LoginResponse>{
    return this.userService.loginAsBusiness(loginRequest).pipe(
      map((response : LoginResponse) => {
        localStorage.setItem("currentUser", JSON.stringify(response));
        this.currentUserSubject.next(response);
        return response;
      })
    )
  }

  public get getCurrentUserValue(): LoginResponse | undefined {
    return this.currentUserSubject ? this.currentUserSubject.value : undefined
  }

  logout() {
    localStorage.removeItem("currentUser")
    this.currentUserSubject.next(undefined);
    this.router.navigate(["/home"])
  }

  registerRepresentative(registrationFormHolder: RepresentativeRegistrationForm) {
    return this.userService.registerRepresentative(registrationFormHolder)
  }

  registerBusiness(registrationFormHolder: BusinessRegistrationForm) {
    return this.userService.registerBusiness(registrationFormHolder)
  }

  isBusiness() {
    return this.currentUserSubject ? this.currentUserSubject.value?.authority.includes(Authority.Business)
      : false;
  }

  isRepresentative() {
    return this.currentUserSubject ? this.currentUserSubject.value?.authority.includes(Authority.Representative)
      : false;
  }
}
