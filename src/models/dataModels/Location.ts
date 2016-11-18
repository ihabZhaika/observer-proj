import {Commodity} from "./Commodity";
/**
 * Created by ihab on 10/23/16.
 */
export interface Location
{
    id? : string;
    name : string;
    // location:string;
    commodities :Commodity[];


}