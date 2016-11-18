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
  // @Input('source') set source(value:Commodity[])
  // {
  //   this.commodities=value;
  // }
  // @Output('sourceChange') sourceChange = new EventEmitter();
  // @Output('update')onUpdate = new EventEmitter();
  // @Output('remove')onRemove =  new EventEmitter();
  // @Output('create')onCreate =  new EventEmitter();
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
  selectedCommodity:Commodity;
  d1=["a","b"];
  d:any;
  constructor(public localization: LocalizationService,private fb:FormBuilder,private data:DataService)
  {
    super(null, localization);
    this.commoditiesSource = this.data.readCommodities();
  }


  modalActions = new EventEmitter<string|MaterializeAction>();
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

    //if passed
    // this.sourceChange.emit(this.commodities);
  }

  update()
  {
    this.commodities[this.editObjectIndex]=this.form.value;
    this.closeModal();

    //if passed
    // this.sourceChange.emit(this.commodities);
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

    //if passed
    // this.parent.commodities.push(commodity);
    // this.sourceChange.emit(this.commodities);
    // console.log(data);
    // this.dataService.addCommodity(data).subscribe(data=>this.result=data,error=>this.result=error);
  }


  ngOnInit()
  {

    this.localization.translationChanged.subscribe(
      () => {
        this.columns[0].header = this.localization.translate('TYPE_NUMBER');
        this.columns[1].header = this.localization.translate('NAME');
        this.columns[2].header = this.localization.translate('PRICE');
      });

    this.columns =[

      {field:"no"                 ,filter:"true" ,sortable:"true" },
      {field:"name"               ,filter:"true" ,sortable:"true"},
      {field:"price"              ,filter:"true" ,sortable:"true"}

    ];



    this.items = [
      {label: this.localization.translate('EDIT',{},this.localization.languageCode), icon: 'fa-search', command: (event) => this.showEdit()},
      {label: this.localization.translate("REMOVE"), icon: 'fa-close', command: (event) => this.remove()}
    ];

    if(this.parent)
    {
      this.commodities=this.parent.commodities;
      if(!this.commodities)
      {
        console.log("Why its null ?",this.commodities);
      }
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

}
