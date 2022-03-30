import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomColor'
})
export class RandomColorPipe implements PipeTransform {
  transform(_: any): string {
    return '#' + Math.random().toString(16).slice(2, 8);
  }
}
