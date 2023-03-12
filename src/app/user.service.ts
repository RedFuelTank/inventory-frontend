import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import jwt_decode from 'jwt-decode';
import {LoginResponse} from "./model/login-response";
import {map} from "rxjs/operators";
import {LoginRequest} from "./model/login-request";
import {BusinessRegistrationForm} from "./model/business-registration-form";
import {RepresentativeRegistrationForm} from "./model/representative-registration-form";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static REST_API_SERVER = "/api";

  constructor(private http: HttpClient) {}

  public loginAsRepresentative(request : LoginRequest) : Observable<LoginResponse> {
    return this.http.post<HttpResponse<any>>(UserService.REST_API_SERVER + "/user/login",
      request,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        observe: "response"
      }).pipe(map((response : HttpResponse<any>) => {
      const token = response.headers.get("Authorization")!.replace("Bearer ", "")
      const tokenInfo = this.getDecodedAccessToken(token);
      return new LoginResponse(tokenInfo.sub, token, tokenInfo.roles)
    }));
  }


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  registerRepresentative(registrationForm: RepresentativeRegistrationForm) : Observable<any>{
    return this.http.post<any>(UserService.REST_API_SERVER + "/user/registration",
      registrationForm,
      {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
  }

  registerBusiness(registrationForm: BusinessRegistrationForm) {
    return this.http.post<any>(UserService.REST_API_SERVER + "/business/registration",
      registrationForm,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      })
  }

  loginAsBusiness(request: LoginRequest) {
    return this.http.post<HttpResponse<any>>(UserService.REST_API_SERVER + "/business/login",
      request,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        observe: "response"
      }).pipe(map((response : HttpResponse<any>) => {
      const token = response.headers.get("Authorization")!.replace("Bearer ", "")
      const tokenInfo = this.getDecodedAccessToken(token);
      return new LoginResponse(tokenInfo.sub, token, tokenInfo.roles)
    }));
  }
}
