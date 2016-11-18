import {Person} from "./Person";
/**
 * Created by ihab on 10/23/16.
 */
export interface  DrivingRecord {
    id? : string;
    driver: Person;
    salary:number;
    workingDates:Date[];
    isDiscrete : boolean // tells whether the data are from - to , or discrete
}