import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private static REST_API_SERVER = "/api";

  constructor(private http : HttpClient) {}

  upload(file : File) : Observable<any>{
    const formData : FormData = new FormData()

    formData.append('files', file);

    return this.http.post(FileUploadService.REST_API_SERVER + "/business/upload/image", formData, {
      reportProgress: true,
      responseType: 'json',
    });
  }

  load(id: number) {
    return this.http.get(FileUploadService.REST_API_SERVER + `/business/load/image/0`, {
      responseType: 'blob'
    });
  }
}
