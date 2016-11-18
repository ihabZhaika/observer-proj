import { Component, OnInit } from '@angular/core';
import {Locale , LocalizationService} from "angular2localization";

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css']
})
export class AdminComponent extends Locale  implements OnInit {

  constructor(public localization: LocalizationService) {
    super(null, localization);

  }

  ngOnInit() {
  }

}
