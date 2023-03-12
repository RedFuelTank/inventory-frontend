import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageData} from "./model/storage-data";
import {ItemData} from "./model/item-data";

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
  private static REST_API_SERVER = "/api";
  constructor(private http: HttpClient) { }

  getRootDirectoryContent(size : number, page : number) : Observable<any> {
    return this.http.get<any>(DirectoryService.REST_API_SERVER + `/business/storage?size=${size}&page=${page}`)
  }

  public deleteItem(id: number) {
    this.http.delete(DirectoryService.REST_API_SERVER + `/business/item/${id}`).subscribe();
  }

  public deleteStorage(id: number) {
    this.http.delete(DirectoryService.REST_API_SERVER + `/business/storage/${id}`).subscribe();
  }

  public createStorage(storage : StorageData) : Observable<any>{
    return this.http.post<any>(DirectoryService.REST_API_SERVER + "/business/storage",
      storage,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      })
  }

  public createItem(item: ItemData) : Observable<any> {
    return this.http.post<any>(DirectoryService.REST_API_SERVER + "/business/item",
      item,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
      })
  }

  getDirectoryContentById(upperStorageId: any, size : number, page : number) : Observable<any>{
    return this.http.get<any>(DirectoryService.REST_API_SERVER + `/business/storage?storageId=${upperStorageId}&size=${size}&page=${page}`)
  }
}
