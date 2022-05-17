import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowPasswordPipe } from './show-password.pipe';
import { UserRolePipe } from './user-role.pipe';



@NgModule({
  declarations: [
    ShowPasswordPipe,
    UserRolePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShowPasswordPipe,
    UserRolePipe
  ]
})
export class PipesModule { }
