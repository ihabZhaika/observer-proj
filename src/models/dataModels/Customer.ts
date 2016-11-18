import {Payment} from "./Payment";
import {Location} from "./Location"
import {Commodity} from "./Commodity";
/**
 * Created by ihab on 10/23/16.
 */
export interface  Customer
{
    no ?: number;
    name : string;
    phone : string;
    balance: number;
    payments? : Payment[];
    renovations? : Location[];
    commodities?:Commodity[];
}
