import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Item } from 'src/app/interfaces/entities';

export const ERRORS: Array<Item> = [
  { id: 'required', description: 'Campo requerido' },
  { id: 'email', description: 'Correo electronico requerido' },
  { id: 'min', description: 'Menor al valor minimo' },
  { id: 'max', description: 'Mayor al valor maximo' },
  { id: 'onlyNumber', description: 'Solo se admiten números' },
]

@Component({
  selector: 'custom-mat-error',
  templateUrl: './custom-mat-error.component.html',
  styleUrls: ['./custom-mat-error.component.scss']
})
export class CustomMatErrorComponent implements OnInit {

  @Input('control')
  control: AbstractControl;
  errors = ERRORS;
  hidden: boolean = true;
  constructor() { }

  ngOnInit(): void {

  }

  get message(): string {
    if (this.control.errors) {
      const errors = this.control.errors;
      const firstKey = Object.keys(errors)[0];
      const message = this.errors.filter(message => message.id === firstKey)[0];
      return message ? message.description : 'Error indefinido';
    }
    return '';
  }

}