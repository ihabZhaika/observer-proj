
import {Customer} from "./Customer";
import {Commodity} from "./Commodity";
import {Person} from "./Person";
import {Location} from "./Location";
/**
 * Created by ihab on 10/24/16.
 */
export interface Shift
{
    id? : string;
    from : Customer;
    fromLocation:Location;
    to : Customer;
    toLocation:Location;
    date:number;
    createDate:Date;
    commodityType:Commodity;
    description:string;
    totalPurchasePrice:number;
    sellingPrice:number;
    totalSellingPrice:number;
    driver : Person;
    quantity:number;
    profitMargin:number;

}