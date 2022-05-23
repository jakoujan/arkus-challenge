import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMovement } from 'src/app/enums/enums';
import { IAccount } from 'src/app/interfaces/entities';
import { profiles } from 'src/environments/environment';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {

  form: FormGroup;
  account: IAccount;
  movement: EMovement;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AccountFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.movement = this.data.movement;
    this.account = this.data.entity;

    this.form = this.fb.group({
      accountName: [this.account.accountName, Validators.required],
      customerName: [this.account.customerName, Validators.required],
      responsible: [this.account.responsible, Validators.required],
    });
  }

  public save() {
    this.account.accountName = this.form.get('accountName').value;
    this.account.customerName = this.form.get('customerName').value;
    this.account.responsible = this.form.get('responsible').value;
    this.dialogRef.close(this.account);
  }

  close() {
    this.dialogRef.close();
  }

}
