import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  radioChangeHandler(event : any) {
    switch (event.id) {
      case "private-client-radio":
        break
      case "business-client-radio":
        break
    }
  }

}
