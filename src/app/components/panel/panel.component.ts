import {Component , OnInit , EventEmitter} from '@angular/core';
import {MaterializeAction} from "angular2-materialize";

@Component({
  selector: 'app-panel',
  templateUrl: 'panel.component.html',
  styleUrls: ['panel.component.css']
})
export class PanelComponent implements OnInit {

  private selectOptions = [
    {value:1,name:"Option 1"},
    {value:2,name:"Option 2"},
    {value:3,name:"Option 3"}
  ];
  modalActions = new EventEmitter<string|MaterializeAction>();
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }
  constructor() { }

  ngOnInit() {
  }

}
