import {Component, OnInit} from '@angular/core';
import {StorageData} from "../model/storage-data";
import {ItemData} from "../model/item-data";
import {DirectoryService} from "../directory.service";
import {Router} from "@angular/router";
import {Validators} from "@angular/forms";
import {FileUploadService} from "../file-upload.service";

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.scss']
})
export class UserItemsComponent implements OnInit {
  public directoriesOnPage!: StorageData[]
  public itemsOnPage!: ItemData[]
  public currentStorageId! : any
  public userUsername!: string
  public totalElements!: number
  public currentPage: number = 1
  public size: number = 5;
  public maxPagesRange: number = 5;
  constructor(private service: DirectoryService, private imageService : FileUploadService, private route: Router) {
    const currentUserString = localStorage.getItem("currentUser");
    const currentUserJson = currentUserString ? JSON.parse(currentUserString) : undefined;
    this.userUsername = currentUserJson.username
  }

  ngOnInit(): void {
    this.loadPage(null);
  }

  loadPage(upperStorageId : any) {
    this.directoriesOnPage = []
    this.itemsOnPage = []
    this.currentStorageId = upperStorageId

    if (upperStorageId == null) {
      this.service.getRootDirectoryContent(this.size, this.currentPage).subscribe(page => {
        this.extracted(page)
        }
      );
    } else {
      this.service.getDirectoryContentById(upperStorageId, this.size, this.currentPage).subscribe(
        page => {
          this.extracted(page)
        }
      )
    }
  }

  deleteItem(id: number) {
    this.service.deleteItem(id);
    this.route.navigate(["items"])
  }

  deleteDirectory(id: number) {
    this.service.deleteStorage(id);
    this.route.navigate(["items"])
  }

  extracted(page : any) {
    for (let data of page.content) {
      if (data.type === "STORAGE") {
        var storageData: StorageData = new StorageData(data.id, data.name, data.upperStorageId);
        this.directoriesOnPage.push(storageData)
      }

      if (data.type === "ITEM") {
        const reader = new FileReader()
        reader.onload = (e : any) => {
          data.image = e.target.result
          console.log(data.image)
        }
        this.imageService.load(data.id).subscribe(image => {
          reader.readAsDataURL(image);
        })
        var itemData: ItemData = new ItemData(data.id, data.name, data.storageId)
        this.itemsOnPage.push(itemData);
      }
    }

    this.totalElements = page.totalElements
  }

  openStorage(id: number) {
    this.loadPage(id);
  }
}
