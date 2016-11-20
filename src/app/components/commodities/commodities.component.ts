import {Component , OnInit , ElementRef , ViewChild , EventEmitter , Output , Input} from '@angular/core';
import {Commodity} from "../../../models/dataModels/Commodity";
import {Locale , LocalizationService} from "angular2localization";
import {MenuItem} from "primeng/components/common/api";
import {MaterializeAction} from "angular2-materialize";
import {DataService} from "../../services/data/data.service";
import {FormGroup , FormBuilder , Validators} from "@angular/forms";
import {Crud} from "../../../models/crud";
import {Customer} from "../../../models/dataModels/Customer";

@Component({
             selector: 'app-commodities',
             templateUrl: 'commodities.component.html',
             styleUrls: ['commodities.component.css']
           })
export class CommoditiesComponent  extends Locale implements OnInit,Crud  {
  @Input('parent') parent:Customer=null;
  @ViewChild("cMenu")cMenu:ElementRef;

  //menu items
  private items: MenuItem[];
  commodities:Commodity[]=[];
  commoditiesSource:Commodity[]=[];
  selectedRow:Commodity;
  isEdit:boolean=false;
  editObjectIndex=-1;
  form : FormGroup;
  columns :any;
  //used by the template
  selectedCommodity:Commodity;

  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(public localization: LocalizationService,private fb:FormBuilder,private data:DataService)
  {
    super(null, localization);
    this.commoditiesSource = this.data.readCommodities();
  }
  ngOnInit()
  {

    this.localization.translationChanged.subscribe(
      () => {
        this.columns[0].header = this.localization.translate('TYPE_NUMBER');
        this.columns[1].header = this.localization.translate('NAME');
        this.columns[2].header = this.localization.translate('PRICE');
        this.items[0].label = this.localization.translate('EDIT');
        this.items[1].label = this.localization.translate('REMOVE');

        console.log("Language triggered");
      });

    this.columns =[

      {field:"no"                 ,filter:"true" ,sortable:"true" },
      {field:"name"               ,filter:"true" ,sortable:"true"},
      {field:"price"              ,filter:"true" ,sortable:"true"}

    ];



    this.items = [
      {label: "EDIT", icon: 'fa-search', command: (event) => this.showEdit()},
      {label: "REMOVE", icon: 'fa-close', command: (event) => this.remove()}
    ];

    if(this.parent)
    {
      this.commodities=this.parent.commodities;
      this.form=this. fb.group({
                                 no:[,Validators.required],
                                 name:[,Validators.required],
                                 price:['',Validators.required],
                               });
    }
    else
    {
      this.commodities = this.commoditiesSource;
      this.form=this.fb.group({
                                name:['',Validators.required],
                                price:['',Validators.required],
                              });
    }

  }



  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
    this.editObjectIndex=-1;
    this.isEdit=false;
    this.form.reset();

  }



  private  showEdit()
  {
    this.editObjectIndex=this.commodities.indexOf(this.selectedRow);
    this.form.patchValue(this.selectedRow);
    this.isEdit=true;
    this.openModal();
  }

  remove ()
  {
    //API CALL
    this.commodities.splice(this.commodities.indexOf(this.selectedRow),1);

  }

  update()
  {
    this.commodities[this.editObjectIndex]=this.form.value;
    this.closeModal();

  }

  read()
  {
  }

  add()
  {
    console.log(this.form.value);
    let commodity:Commodity = this.form.value;
    console.log(JSON.stringify(commodity));
    this.commodities.push(commodity);
    this.closeModal();

  }



}
