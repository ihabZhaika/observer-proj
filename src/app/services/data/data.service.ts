import { Injectable } from '@angular/core';
import {Commodity} from "../../../models/dataModels/Commodity";
import {Http , Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class DataService {


  constructor(private http: Http) { }

  readCommodities():Commodity[]
  {
    let commodities:Commodity[]=[];
    commodities.push({no:1,name:"Sand",price:55});
    commodities.push({no:2,name:"gas",price:200});
    commodities.push({no:3,name:"dust",price:800});
    return commodities
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
