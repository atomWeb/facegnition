import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todateObj',
})
export class TodatePipe implements PipeTransform {
  transform(value: any): any {
    if (value) {
      const temp = value.toString().replace(' ', 'T');
      return new Date(temp);
    } else {
      return null;
    }
  }
}
