import { Injectable } from '@angular/core';
import {Commodity} from "../../../models/dataModels/Commodity";
import {Http , Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {Customer} from "../../../models/dataModels/Customer";
import {Location} from "../../../models/dataModels/Location";
import {Person} from "../../../models/dataModels/Person";

@Injectable()
export class DataService {


  constructor(private http: Http) { }



  readDrivers():Person[]
  {
    let drivers:Person[]=[];
    let driver : Person= {no:1,name:"ihab",phone:"0256"};
    let driver1 : Person= {no:2,name:"bahaa",phone:"85002"};
    let driver2 : Person= {no:3,name:"ali",phone:"05684265"};
    let driver3 : Person= {no:4,name:"nebal",phone:"0504299845"};
    drivers.push(driver);
    drivers.push(driver1);
    drivers.push(driver2);
    drivers.push(driver3);
    return drivers;
  }

  readCustomers():Customer[]
  {
    let customers:Customer[]=[];
    customers.push( {no:1,name:"محمد" ,phone:"0504816425" , balance:3000 });
    customers.push({no:2,name:"person B" ,phone:"0504816429", balance:1500});
    customers.push({no:3,name:"علي سلمان" ,phone:"0504816427", balance:1500});
    customers.push( {no:4,name:"Customer C" ,phone:"0504816422",  balance:1500});
    return customers;
  }

  readCommodities():Commodity[]
  {
    let commodities:Commodity[]=[];
    let commodity:Commodity = {no:1,name:"Sand",price:0};
    let commodity1:Commodity = {no:2,name:"gas",price:0};
    let commodity2:Commodity = {no:3,name:"dust",price:0};
    commodities.push(commodity);
    commodities.push(commodity1);
    commodities.push(commodity2);
    return commodities;
  }


  readLocations():Location[]
  {
    let locations:Location[]=[];


    let locationA : Location = {no:1,name:"القدس"};
    let locationB : Location = {no:2,name:"نابلس"};
    let locationC : Location = {no:2,name:"ירושלים"};
    let locationD : Location = {no:2,name:"منطقة"};
    locations.push(locationA);
    locations.push(locationB);
    locations.push(locationC);
    locations.push(locationD);
    return locations;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  addCommodity(commodity:Commodity)
  {
    return this.http.post('localhost:3000/commodity',commodity) .map(this.extractData)
               .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
