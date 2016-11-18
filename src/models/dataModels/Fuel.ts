import {FuelFillType} from "../enums/FuelFillType";
import {Vehicle} from "./Vehicle";
/**
 * Created by ihab on 10/24/16.
 */
export  interface  Fuel
{
    id? : string;
    vehicle:Vehicle;
    fillType:FuelFillType;
    price?:number;
    liters?:number;


}