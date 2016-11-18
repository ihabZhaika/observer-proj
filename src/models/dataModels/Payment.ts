import {PaymentType} from "../enums/PaymentType";
/**
 * Created by ihab on 10/23/16.
 */
export interface Payment
{
    id?:string;
    name:string;
    amount:number;
    oldBalance:number;
    newBalance:number;
    date:Date;
    type :PaymentType;

}