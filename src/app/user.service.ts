import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import jwt_decode from 'jwt-decode';
import {LoginResponse} from "./model/login-response";
import {map} from "rxjs/operators";
import {LoginRequest} from "./model/login-request";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static REST_API_SERVER = "/api";

  constructor(private http: HttpClient) {}

  public login(request : LoginRequest) : Observable<LoginResponse> {
    return this.http.post<HttpResponse<any>>(UserService.REST_API_SERVER + "/login",
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
}
