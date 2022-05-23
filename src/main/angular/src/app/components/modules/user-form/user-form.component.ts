import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMovement } from 'src/app/enums/enums';
import { IProfile, IUser } from 'src/app/interfaces/entities';
import { profiles } from 'src/environments/environment';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  form: FormGroup;
  user: IUser;
  profiles: Array<IProfile> = profiles;
  movement: EMovement;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.movement = this.data.movement;
    this.user = this.data.entity;

    this.form = this.fb.group({
      username: [this.user.username, Validators.required],
      name: [this.user.name, Validators.required],
      password: [this.user.password, Validators.required],
      email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
      userRole: [this.user.userRole, Validators.required],
      englishLevel: [this.user.englishLevel, Validators.required],
      techKnowledge: [this.user.techKnowledge, Validators.required],
      resumeLink: [this.user.resumeLink, Validators.required],
    });

    if (this.movement === EMovement.UPDATE) {
      this.form.get('username').disable();
      this.form.get('password').disable();
    }
  }

  public save() {
    this.user.username = this.form.get('username').value;
    this.user.name = this.form.get('name').value;
    this.user.password = this.form.get('password').value;
    this.user.email = this.form.get('email').value;
    this.user.userRole = this.form.get('userRole').value;
    this.user.englishLevel = this.form.get('englishLevel').value;
    this.user.techKnowledge = this.form.get('techKnowledge').value;
    this.user.resumeLink = this.form.get('resumeLink').value;
    this.dialogRef.close(this.user);
  }

  close() {
    this.dialogRef.close();
  }

}
