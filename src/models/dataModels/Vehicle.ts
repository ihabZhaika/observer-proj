import {Shift} from "./Shift";
import {Repair} from "./Repair";
import {Expense} from "./Expense";
import {DrivingRecord} from "./DrivingRecord";
import {Fuel} from "./Fuel";
/**
 * Created by ihab on 10/23/16.
 * Represents a vehicle with all related stuffs to it
 */
export interface Vehicle
{
    id? : string;
    plateNumber:number;
    model : string;
    productionYear:number
    shifts : Shift[];
    repairs:Repair[];
    expenses:Expense[];
    drivingRecords:DrivingRecord[];
    fuels:Fuel[];
    licenseExpiryDate? : Date;
    monthlyCheckDate?:Date;
}