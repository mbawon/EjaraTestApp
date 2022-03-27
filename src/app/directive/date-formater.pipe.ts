import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormater'
})
export class DateFormaterPipe implements PipeTransform {

  transform(unixTimestamp: any): unknown {
    return new Date(unixTimestamp).toLocaleString();
  }

}
