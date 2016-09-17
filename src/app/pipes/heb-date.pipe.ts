import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'hebDatePipe'
})
export class HebDatePipe implements PipeTransform {

  transform(dateString: string): string {
    var result = '';
    try {
      var date: any = new Date(dateString);
      result = date.toHebrew();
    } catch (e) {
      // console.log(e);
    }
    return result;
  }
}
