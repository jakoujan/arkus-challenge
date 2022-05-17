import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../components/ui/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  dialogRef: any;
  showed: boolean = false;
  constructor(public dialog: MatDialog) { }

  public show(text?: string) {
    if (!this.showed) {
      this.showed = true;
      this.dialogRef = this.dialog.open(SpinnerComponent, {
        width: '200px',
        height: '170px',
        disableClose: true,
        data: text
      });
    }
  }

  public hide() {
    if (this.showed) {
      this.showed = false;
      this.dialogRef.close();
    }
  }


}