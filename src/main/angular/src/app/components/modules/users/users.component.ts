import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EMovement } from 'src/app/enums/enums';
import { IUserFilter } from 'src/app/filters/filters';
import { IUser } from 'src/app/interfaces/entities';
import { UserService } from 'src/app/services/user.service';
import { BaseComponent } from '../../base-component.component';
import { ConfirmationDialogService } from '../../ui/confirmation-dialog/confirmation-dialog.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseComponent implements OnInit {

  dataSource: MatTableDataSource<IUser>;
  length: number = 0;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'actions', 'username', 'email', 'role'];
  constructor(
    private userService: UserService,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private confirmationDialogService: ConfirmationDialogService) {
    super();
  }

  filter: IUserFilter = {
    entity: {
      id: undefined,
      username: undefined,
      password: undefined,
      name: undefined,
      email: undefined,
      userRole: undefined,
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
    this.userService.getUsers(this.filter).subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.changeDetectorRefs.detectChanges();
    })
  }

  toggleSearchBar() {
    this.filter.hidden = !this.filter.hidden;
    this.filter.entity = {
      id: undefined,
      username: undefined,
      password: undefined,
      name: undefined,
      email: undefined,
      userRole: undefined,
    }
  }

  public addRow() {
    const entity: IUser = {
      id: undefined,
      username: undefined,
      password: undefined,
      name: undefined,
      email: undefined,
      userRole: undefined,
    };
    this.showForm(entity, EMovement.CREATE);
  }

  public async showForm(entity: IUser, movement?: EMovement) {
    movement = movement ?? EMovement.UPDATE;
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '950px',
      disableClose: true,
      data: {
        entity: entity,
        movement: movement
      }
    });

    dialogRef.afterClosed().subscribe(user => {
      if (user) {
        if (movement === EMovement.CREATE) {
          this.userService.createUser(user).subscribe(response => {
            this.setFilter();
          });
        } else {
          this.userService.updateUser(user.id, user).subscribe(response => {
            this.setFilter();
          });
        }
      }
    });
  }

  delete(entity: IUser): void {
    const dialogRef = this.confirmationDialogService.showConfirmationDialog('¿Desea eliminar el registro?', '350px', 'Aceptar', 'Cancelar');
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(entity.id).subscribe(() => {
          const snacBarRef = this.snackBar.open('El usuario se elimino correctamente', 'Cerrar', {
            duration: 3000
          });
          this.setFilter();
        });

      }
    });
  }
}
