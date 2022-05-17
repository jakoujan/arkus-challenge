import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showPassword'
})
export class ShowPasswordPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
