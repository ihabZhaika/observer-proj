import {Component , OnInit , ElementRef , ViewChild , EventEmitter} from '@angular/core';
import {MenuItem} from "primeng/components/common/api";
import {Crud} from "../../../models/crud";
import {Locale , LocalizationService} from "angular2localization";
import {Vehicle} from "../../../models/dataModels/Vehicle";
import {FormGroup , FormBuilder , Validators} from "@angular/forms";
import {DataService} from "../../services/data/data.service";
import {MaterializeAction} from "angular2-materialize";

@Component({
  selector: 'app-car',
  templateUrl: 'car.component.html',
  styleUrls: ['car.component.css']
})
export class CarComponent extends Locale implements OnInit ,Crud{


  @ViewChild("cMenu")cMenu:ElementRef;
  //menu items
  private items: MenuItem[];


  cars:Vehicle[]=[];
  selectedRow:Vehicle;
  isEdit:boolean=false;
  editObjectIndex=-1;
  form : FormGroup;
  columns :any;
  // formCommodities:

  //for translation
  EDIT:string="EDIT";
  REMOVE:string="REMOVE";
  constructor(public localization: LocalizationService,private fb:FormBuilder,private data:DataService)
  {
    super(null, localization);

    this.form=fb.group({
                         plateNumber:['',Validators.required],
                         model:['',Validators.required],
                         productionYear:['',Validators.required],
                         licenseExpiryDate:[''],
                         monthlyCheckDate:['',Validators.required],
                         shifts:[[]],
                         repairs:[[]],
                         expenses:[[]],
                         drivingRecords:[[]],
                         fuels:[[]]

                       });


  }

  ngOnInit()
  {



    this.localization.translationChanged.subscribe(
      () => {
        this.columns[0].header = this.localization.translate('CUSTOMER_NUMBER');
        this.columns[1].header = this.localization.translate('NAME');
        this.columns[2].header = this.localization.translate('PHONE');
        this.columns[3].header = this.localization.translate('BALANCE');
        this.items[0].label = this.localization.translate('EDIT');
        this.items[1].label = this.localization.translate('REMOVE');
      });

    this.columns =[

      {field:"plateNumber"                  ,filter:"true" ,sortable:"true"},
      {field:"model"                        ,filter:"true" ,sortable:"true"},
      {field:"productionYear"               ,filter:"true" ,sortable:"true"},
      {field:"licenseExpiryDate"            ,filter:"true" ,sortable:"true"},
      {field:"monthlyCheckDate"             ,filter:"true" ,sortable:"true"}

    ];
    this.items = [
      {label: "EDIT", icon: 'fa-search', command: (event) => this.showEdit()},
      {label: "REMOVE", icon: 'fa-close', command: (event) => this.remove()}
    ];


  }


  modalActions = new EventEmitter<string|MaterializeAction>();

  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
    console.log(this.form.value);

  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
    this.editObjectIndex=-1;
    this.isEdit=false;
    this.form.reset();
  }


  private  showEdit()
  {
    this.editObjectIndex=this.cars.indexOf(this.selectedRow);
    console.log(this.form.value);
    console.log(this.selectedRow);
    this.form.setValue(this.selectedRow);
    this.isEdit=true;
    this.openModal();
  }


  remove ()
  {
    this.cars.splice(this.cars.indexOf(this.selectedRow),1);

  }

  update()
  {
    // this.form.get("select").disable();
    console.log("THe updated object : ",this.form.value);
    this.cars[this.editObjectIndex]=this.form.value;
    this.closeModal();
  }

  read()
  {
  }

  add()
  {
    console.log(this.form.value);
    let car:Vehicle = this.form.value;
    car.shifts=[];
    car.repairs=[];
    car.expenses=[];
    car.drivingRecords=[];
    car.fuels=[];
    console.log(JSON.stringify(car));
    this.cars.push(car);
    this.closeModal();

  }
}
