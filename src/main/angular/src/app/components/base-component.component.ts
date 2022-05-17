import { SessionStorage } from 'ngx-webstorage';
import { constants } from 'src/environments/environment';
import { Component } from '@angular/core';
import { ISession } from 'src/app/interfaces/entities';

@Component({
  template: ''
})
export class BaseComponent {

  @SessionStorage(constants.SESSION)
  session: ISession;

  constructor() {

  }

  public disable(value: boolean) {
    return !value;
  }

  compare(val1: any, val2: any) {
    if (val1 && val2) {
      return val1.id === val2.id;
    } else
      return false;
  }
}