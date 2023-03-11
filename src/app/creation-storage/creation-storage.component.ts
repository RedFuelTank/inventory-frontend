import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {DirectoryService} from "../directory.service";
import {LoginRequest} from "../model/login-request";
import {LoginResponse} from "../model/login-response";
import {StorageData} from "../model/storage-data";

@Component({
  selector: 'app-creation-storage',
  templateUrl: './creation-storage.component.html',
  styleUrls: ['./creation-storage.component.scss']
})
export class CreationStorageComponent implements OnInit{
  storageForm!: UntypedFormGroup;
  upperStorageId : any

  constructor(private formBuilder: UntypedFormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private directoryService: DirectoryService) {
  }

  ngOnInit(): void {
    this.upperStorageId = this.route.snapshot.paramMap.get("id");

    this.storageForm = this.formBuilder.group({
      name: ["", Validators.required]
    });
  }

  onSubmit() {
    if (this.storageForm.invalid) {
      return;
    }
    const {name} = this.storageForm.value
    let storageData = new StorageData(null, name, this.upperStorageId)
    console.log(storageData)

    this.directoryService.createStorage(storageData).subscribe((response: LoginResponse) => {

    });
  }
}
