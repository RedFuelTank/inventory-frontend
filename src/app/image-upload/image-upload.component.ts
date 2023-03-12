import {Component, OnInit} from '@angular/core';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileUploadService} from "../file-upload.service";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  image = '';

  constructor(private uploadService: FileUploadService) {
  }

  ngOnInit() {
    const reader = new FileReader()
    reader.onload = (e: any) => {
      this.image = e.target.result
    }
    this.uploadService.load(0).subscribe(data => {
      reader.readAsDataURL(data)
    });
  }

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe();
      }

      this.selectedFiles = undefined;
    }
  }
}
