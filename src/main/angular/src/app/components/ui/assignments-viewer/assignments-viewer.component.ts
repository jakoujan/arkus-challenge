import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EAssingmentStatus } from 'src/app/enums/enums';
import { IAssignmentView, IUser } from 'src/app/interfaces/entities';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-assignments-viewer',
  templateUrl: './assignments-viewer.component.html',
  styleUrls: ['./assignments-viewer.component.scss']
})
export class AssignmentsViewerComponent implements OnInit {

  assignment: IAssignmentView;
  current: IAssignmentView;
  others: Array<IAssignmentView> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AssignmentsViewerComponent>, private assignmentService: AssignmentService) { }

  ngOnInit(): void {
    this.assignment = this.data.assignment;
    this.assignmentService.getAssignmentsByUser(this.assignment.user).subscribe(assignments => {
      assignments.filter(a => a.status === EAssingmentStatus.ASSIGNED).flatMap(a => this.current = a);
      this.others = assignments.filter(a => a.status === EAssingmentStatus.UNASSIGNED);
    });
  }

  close() {
    this.dialogRef.close();
  }

}
