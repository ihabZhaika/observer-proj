/**
 * Created by ihab on 10/27/16.
 */
export class UtilsService
{
    makeCopy(obj)
    {
        if(obj == null || typeof(obj) != 'object')
            return obj;
        var temp = new obj.constructor();
        for(var key in obj)
            temp[key] = this.makeCopy(obj[key]);
        return temp;
    }



}
