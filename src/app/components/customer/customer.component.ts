import {Component , OnInit , EventEmitter , ViewChild , ElementRef} from '@angular/core';
import {FormBuilder , FormGroup , Validators , FormArray} from "@angular/forms";
import {LocalizationService , Locale} from "angular2localization";
import {MaterializeAction} from "angular2-materialize";
import {MenuItem , SelectItem} from "primeng/components/common/api";
import {Crud} from "../../../models/crud";
import {Customer} from "../../../models/dataModels/Customer";
import {Commodity} from "../../../models/dataModels/Commodity";
import {DataService} from "../../services/data/data.service";

//TODO : fix when editing the person , the option appear as null,null .. because the object ref are different
@Component({
             selector: 'app-customer',
             templateUrl: 'customer.component.html',
             styleUrls: ['customer.component.css']
           })
export class CustomerComponent extends Locale implements OnInit ,Crud{

  @ViewChild("cMenu")cMenu:ElementRef;
  //menu items
  private items: MenuItem[];

  customers:Customer[]=[];
  selectedRow:Customer;
  isEdit:boolean=false;
  editObjectIndex=-1;
  form : FormGroup;
  commodities:SelectItem[]=[];
  selected:Commodity[]=[];
  formCommodities:FormArray ;
  columns :any;

  constructor(public localization: LocalizationService,private fb:FormBuilder,private data:DataService)
  {
    super(null, localization);


    this.form=fb.group({
                         name:['',Validators.required],
                         phone:['',Validators.required],
                         balance:['',Validators.required],
                         commodities:[[]],
                         payments:[[]],
                         renovations:[[]]

                       });
    //                         commodities:fb.array([])

    this.formCommodities=<FormArray>this.form.controls['commodities'];
    let commodities:Commodity[] = data.readCommodities();
    for (let item of commodities)
    {
      item.price=0;
      this.commodities.push({label:item.name,value:item});

    }



  }
  addCommodity(commodity:Commodity)
  {
    this.formCommodities.push(this.fb.group({
                                              no:[commodity.no,Validators.required],
                                              name:[commodity.name,Validators.required],
                                              price:[commodity.price,Validators.required],
                                            }));
  }

  modalActions = new EventEmitter<string|MaterializeAction>();
  selectActions = new EventEmitter<string|MaterializeAction>();

  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
    console.log(this.form.value);

  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
    this.editObjectIndex=-1;
    this.isEdit=false;
    this.formCommodities.controls=[];
    this.selected=[];
    // this.form.get("select").enable();
    this.form.reset();
  }


  private  showEdit()
  {
    this.editObjectIndex=this.customers.indexOf(this.selectedRow);
    // this.form.get("select").disable();
    // this.form.patchValue({})
    // this.form.controls['select'].setValue([]);
    console.log(this.form.value);
    console.log(this.selectedRow);
    this.form.patchValue(this.selectedRow);
    let select :SelectItem[]=[];
    for(let commodity of  this.selectedRow.commodities)
    {
      select.push({label:commodity.name,value:commodity});
      this.addCommodity(commodity);
    }
    this.form.patchValue({select:[this.commodities[0].value]});


    this.isEdit=true;
    this.openModal();
  }

  remove ()
  {
    this.customers.splice(this.customers.indexOf(this.selectedRow),1);

  }

  update()
  {
    // this.form.get("select").disable();
    console.log("THe updated object : ",this.form.value);
    this.customers[this.editObjectIndex]=this.form.value;
    this.closeModal();
  }

  read()
  {
  }

  add()
  {
    // this.form.get("select").disable();
    console.log(this.form.value);
    let customer:Customer = this.form.value;
    customer.commodities=[];
    customer.payments=[];
    customer.renovations=[];
    console.log(JSON.stringify(customer));
    this.customers.push(customer);
    console.log(this.selected);
    this.closeModal();

    // console.log(data);
    // this.dataService.addCommodity(data).subscribe(data=>this.result=data,error=>this.result=error);
  }

  // selectCommodity(event:any[])
  // {
  //   console.log(event);
  //   let index = 0;
  //   let past :Map<string,any> = new Map();
  //   let current :Map<string,Commodity> = new Map();
  //
  //   for( let item of this.formCommodities.controls)
  //   {
  //     past.set(item.get("name").value,index);
  //     index++;
  //   }
  //
  //   for( let item of event)
  //   {
  //     console.log("in 2");
  //     current.set(item.name,item);
  //   }
  //
  //   past.forEach((value,key)=>
  //                {
  //                  if(!current.has(key))
  //                  {
  //                    // item removed
  //                    this.formCommodities.controls.splice(value,1);
  //                    console.log("removed : "+key);
  //                  }
  //
  //                });
  //   current.forEach((value,key)=>
  //                   {
  //                     if(!past.has(key))
  //                     {
  //                       // new item
  //                       this.addCommodity(value);
  //                       console.log("added : "+key);
  //
  //                     }
  //
  //                   });
  //
  //
  // }




  ngOnInit()
  {

    this.items = [
      {label: this.localization.translate('EDIT',{},this.localization.languageCode), icon: 'fa-search', command: (event) => this.showEdit()},
      {label: this.localization.translate("REMOVE"), icon: 'fa-close', command: (event) => this.remove()}
    ];



    this.localization.translationChanged.subscribe(
      () => {
        this.columns[0].header = this.localization.translate('CUSTOMER_NUMBER');
        this.columns[1].header = this.localization.translate('NAME');
        this.columns[2].header = this.localization.translate('PHONE');
        this.columns[3].header = this.localization.translate('BALANCE');
      });

    this.columns =[

      {field:"no"                 ,filter:"true" ,sortable:"true"},
      {field:"name"               ,filter:"true" ,sortable:"true"},
      {field:"phone"              ,filter:"true" ,sortable:"true"},
      {field:"balance"              ,filter:"true" ,sortable:"true"}

    ];



  }

  // testIt(event)
  // {
  //   console.log("inside");
  // }


}
