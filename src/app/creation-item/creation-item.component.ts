import { Component } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DirectoryService} from "../directory.service";
import {StorageData} from "../model/storage-data";
import {LoginResponse} from "../model/login-response";
import {ItemData} from "../model/item-data";

@Component({
  selector: 'app-creation-item',
  templateUrl: './creation-item.component.html',
  styleUrls: ['./creation-item.component.scss']
})
export class CreationItemComponent {
  itemForm!: UntypedFormGroup;
  upperStorageId : any

  constructor(private formBuilder: UntypedFormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private directoryService: DirectoryService) {
  }

  ngOnInit(): void {
    this.upperStorageId = this.route.snapshot.paramMap.get("id");

    this.itemForm = this.formBuilder.group({
      name: ["", Validators.required]
    });
  }

  onSubmit() {
    if (this.itemForm.invalid) {
      return;
    }
    const {name} = this.itemForm.value
    let itemData = new ItemData(null, name, this.upperStorageId)
    console.log(itemData)

    this.directoryService.createItem(itemData).subscribe((response: LoginResponse) => {

    });
  }
}
