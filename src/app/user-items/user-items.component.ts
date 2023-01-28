import {Component, OnInit} from '@angular/core';
import {DirectoryData} from "../model/directory-data";
import {ItemData} from "../model/item-data";
import {DirectoryService} from "../directory.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.scss']
})
export class UserItemsComponent implements OnInit {
  public directoriesOnPage!: DirectoryData[]
  public itemsOnPage!: ItemData[]

  public userUsername!: string

  constructor(private service: DirectoryService, private route: Router) {
    const currentUserString = localStorage.getItem("currentUser");
    const currentUserJson = currentUserString ? JSON.parse(currentUserString) : undefined;
    this.userUsername = currentUserJson.username
  }

  ngOnInit(): void {
    this.loadPage()
  }

  loadPage() {
    this.directoriesOnPage = []
    this.itemsOnPage = []

    this.service.getRootDirectoryContent(this.userUsername).subscribe(page => {
      for (let data of page.content) {
        if (data.type === "DIRECTORY") {
          var directoryData: DirectoryData = new DirectoryData(data.id, data.name);
          this.directoriesOnPage.push(directoryData)
        }

        if (data.type === "ITEM") {
          var itemData: ItemData = new ItemData(data.id, data.name)
          this.itemsOnPage.push(itemData);
        }
      }
      }
    )
  }

  addButtonPressed() {
    console.log("Pushed")
  }

  deleteItem(id: number) {
    this.service.deleteItem(id, this.userUsername);
    this.route.navigate(["items"])
  }

  deleteDirectory(id: number) {
    this.service.deleteDirectory(id, this.userUsername);
    this.route.navigate(["items"])
  }
}
