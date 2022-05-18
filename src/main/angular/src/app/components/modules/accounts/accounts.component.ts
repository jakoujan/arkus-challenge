import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EMovement } from 'src/app/enums/enums';
import { IAccountFilter } from 'src/app/filters/filters';
import { IAccount } from 'src/app/interfaces/entities';
import { AccountService } from 'src/app/services/account.service';
import { BaseComponent } from '../../base-component.component';
import { ConfirmationDialogService } from '../../ui/confirmation-dialog/confirmation-dialog.service';
import { AccountFormComponent } from '../account-form/account-form.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent extends BaseComponent implements OnInit {

  dataSource: MatTableDataSource<IAccount>;
  length: number = 0;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['accountName', 'actions', 'customerName', 'responsible'];
  constructor(
    private accountService: AccountService,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private confirmationDialogService: ConfirmationDialogService) {
    super();
  }

  filter: IAccountFilter = {
    entity: {
      id: undefined,
      accountName: undefined,
      customerName: undefined,
      responsible: undefined,
    },
    startDate: undefined,
    endDate: undefined,
    hidden: true,
    page: 0,
    rows: 20,
    pageable: true
  }


  ngOnInit() {
    this.setFilter();

  }

  ngAfterViewInit() {
  }

  public setFilter(searchable?: boolean) {
    if (searchable) {
      this.filter.page = 0;
    }
    this.accountService.getAccounts(this.filter).subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.changeDetectorRefs.detectChanges();
    })
  }

  toggleSearchBar() {
    this.filter.hidden = !this.filter.hidden;
    this.filter.entity = {
      id: undefined,
      accountName: undefined,
      customerName: undefined,
      responsible: undefined,
    }
  }

  public addRow() {
    const entity: IAccount = {
      id: undefined,
      accountName: undefined,
      customerName: undefined,
      responsible: undefined,
    };
    this.showForm(entity, EMovement.CREATE);
  }

  public async showForm(entity: IAccount, movement?: EMovement) {
    movement = movement ?? EMovement.UPDATE;
    const dialogRef = this.dialog.open(AccountFormComponent, {
      width: '950px',
      disableClose: true,
      data: {
        entity: entity,
        movement: movement
      }
    });

    dialogRef.afterClosed().subscribe(account => {
      if (account) {
        if (movement === EMovement.CREATE) {
          this.accountService.createAccount(account).subscribe(response => {
            this.setFilter();
          });
        } else {
          this.accountService.updateAccount(account.id, account).subscribe(response => {
            this.setFilter();
          });
        }
      }
    });
  }

  delete(entity: IAccount): void {
    const dialogRef = this.confirmationDialogService.showConfirmationDialog('¿Desea eliminar el registro?', '350px', 'Aceptar', 'Cancelar');
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.accountService.deleteAccount(entity.id).subscribe(() => {
          const snacBarRef = this.snackBar.open('La cuenta se elimino correctamente', 'Cerrar', {
            duration: 3000
          });
          this.setFilter();
        });

      }
    });
  }
}
