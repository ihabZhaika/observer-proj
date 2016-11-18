import {Garage} from "./Garage";
import {RepairPart} from "./RepairPart";
/**
 * Created by ihab on 10/23/16.
 */
export interface  Repair
{
    id? : string ;
    garage: Garage;
    repairPart:RepairPart;
    date:Date;

}