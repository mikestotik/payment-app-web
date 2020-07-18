import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardHide'
})
export class CardHidePipe implements PipeTransform {

  transform(value: number): string | number {
    if (String(value).length === 16){
      const lastNumbers = String(value).slice(-8).split('');

      for (let i = 0; i < 4; i++) {
        lastNumbers[i] = '*';
      }

      return lastNumbers.join('');
    }
    return value;
  }

}
