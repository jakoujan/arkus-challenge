import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IAssignmentViewFilter } from 'src/app/filters/filters';
import { IAssignmentView } from 'src/app/interfaces/entities';
import { AssignmentService } from 'src/app/services/assignment.service';
import { AssignmentsViewerComponent } from '../../ui/assignments-viewer/assignments-viewer.component';
import { ConfirmationDialogService } from '../../ui/confirmation-dialog/confirmation-dialog.service';
import { AssignmentFormComponent } from '../assignment-form/assignment-form.component';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {

  filter: IAssignmentViewFilter = {
    entity: {
      id: undefined,
      user: undefined,
      account: undefined,
      startDate: undefined,
      endDate: undefined,
      status: undefined,
      name: undefined,
      accountName: undefined,
    },
    startDate: undefined,
    endDate: undefined,
    hidden: true,
    page: 0,
    rows: 20,
    pageable: true
  }
  assignments: Array<IAssignmentView> = [];

  constructor(private assignmentService: AssignmentService, private confirmationDialog: ConfirmationDialogService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.setFilter();
  }

  toggleSearchBar() {
    this.filter.hidden = !this.filter.hidden;
    this.filter.entity = {
      id: undefined,
      user: undefined,
      account: undefined,
      startDate: undefined,
      endDate: undefined,
      status: undefined,
      name: undefined,
      accountName: undefined,
    }
  }

  addAssignment() {
    this.dialog.open(AssignmentFormComponent, {
      width: '950px',
      disableClose: true,
      data: {
        assignment: undefined
      }
    }).afterClosed().subscribe(assignments => {
      this.setFilter();
    });
  }

  public get filteredAssignments(): Array<IAssignmentView> {
    let fan = this.filter.entity.accountName ? this.filter.entity.accountName.toLowerCase() : '';
    let fn = this.filter.entity.name ? this.filter.entity.name.toLowerCase() : '';
    return this.assignments.filter(assignment => assignment.name.toLowerCase().indexOf(fn) >= 0)
      .filter(assignment => assignment.accountName.toLowerCase().indexOf(fan) >= 0);

  }

  public setFilter(searchable?: boolean) {
    if (searchable) {
      this.filter.page = 0;
    }
    this.assignmentService.getAssignments(this.filter).subscribe(assignments => {
      this.assignments = assignments;
    })
  }

  public assignmentsViewer(assignment: IAssignmentView) {
    const dialogRef = this.dialog.open(AssignmentsViewerComponent, {
      width: '950px',
      disableClose: true,
      data: {
        assignment: assignment
      }
    });
  }

  public deleteAssignment(assignment: IAssignmentView) {
    this.confirmationDialog.showConfirmationDialog("¿Confirma la eliminación de la asignación?", "350px", "Aceptar", "Cancelar").afterClosed().subscribe(result => {
      if (result) {
        this.assignmentService.deleteAssignment(assignment.id).subscribe(() => {
          this.setFilter();
        });
      }
    });
  }
}
