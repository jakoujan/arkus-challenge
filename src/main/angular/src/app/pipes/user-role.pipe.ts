import { Pipe, PipeTransform } from '@angular/core';
import { constants } from 'src/environments/environment';

@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {

  transform(value: unknown): unknown {
    return value === constants.ROLE_ADMIN ? 'Administrador' : 'Usuario';
  }

}
