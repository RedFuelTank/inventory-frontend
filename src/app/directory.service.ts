import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
  private static REST_API_SERVER = "/api";
  constructor(private http: HttpClient) { }

  getRootDirectoryContent(username : String) : Observable<any> {
    return this.http.get<any>(DirectoryService.REST_API_SERVER + `/${username}/directory`)
  }

  public deleteItem(id: number, username: string) {
    this.http.delete(DirectoryService.REST_API_SERVER + `/${username}/item/${id}`).subscribe();
  }

  deleteDirectory(id: number, username: string) {
    this.http.delete(DirectoryService.REST_API_SERVER + `/${username}/directory/${id}`).subscribe();
  }
}
