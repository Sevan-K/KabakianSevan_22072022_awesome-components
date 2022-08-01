import { Pipe, PipeTransform } from '@angular/core';

// to declare a pipe the decorator need to be imported
@Pipe({
  name: 'shorten',
})

//  a custom pipe is a class
export class ShortenPipe implements PipeTransform {
  transform(value: string, maxLength: number = 50): string {
    if (value.length <= maxLength) {
      return value;
    }
    return value.substring(0, maxLength) + '...';
  }
}
