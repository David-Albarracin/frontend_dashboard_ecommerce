import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'actionsFormat',
  standalone: true
})
export class ActionsFormatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
