import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormater'
})
export class CurrencyFormaterPipe implements PipeTransform {

  transform(amount:number): unknown {
    if(amount === undefined || amount === null){
      return amount
    }
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

}
