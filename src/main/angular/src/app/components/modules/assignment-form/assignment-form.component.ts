import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EAssingmentStatus } from 'src/app/enums/enums';
import { IAccount, IAssignmentData, IUser } from 'src/app/interfaces/entities';
import { AssignmentService } from 'src/app/services/assignment.service';
import { CatalogService } from 'src/app/services/catalog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.scss']
})
export class AssignmentFormComponent implements OnInit {

  accounts: Array<IAccount> = [];
  availableUsers: Array<IAssignmentData> = [];
  form: FormGroup;
  assignedUsers: Array<IAssignmentData> = [];
  count: number = 0
  constructor(private dialogRef: MatDialogRef<AssignmentFormComponent>, private formBuilder: FormBuilder,
    private catalogService: CatalogService, private userService: UserService, private assignmentService: AssignmentService) { }

  ngOnInit(): void {
    this.catalogService.accounts().subscribe(accounts => this.accounts = accounts);

    this.form = this.formBuilder.group({
      account: [undefined, Validators.required]
    });

    this.form.get('account').valueChanges.subscribe(account => {
      this.userService.getAssignedUsers(account).subscribe(users => {
        this.count = users.length;
        this.assignedUsers = users.map(u => {
          return {
            user: u,
            status: EAssingmentStatus.ASSIGNED
          }
        });
      });
      this.userService.availableusers().subscribe(users => {
        this.availableUsers = users.map(u => {
          return {
            user: u,
            status: EAssingmentStatus.UNASSIGNED
          }
        });
      });
    });
  }

  drop(event: CdkDragDrop<Array<IAssignmentData>>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  unassignedPredicate(item: CdkDrag<IAssignmentData>) {
    let assignment = item.data;
    return assignment.status === EAssingmentStatus.UNASSIGNED;
  }

  checkItem(item: IAssignmentData) {
    return item.status === EAssingmentStatus.ASSIGNED;
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (this.count !== this.assignedUsers.length) {
      let account = this.form.get('account').value;
      const usersToAssign = this.assignedUsers.filter(u => u.status === EAssingmentStatus.UNASSIGNED).map(u => u.user);
      this.assignmentService.createAssignments({
        account: account,
        users: usersToAssign
      }).subscribe(assignments => {
        this.dialogRef.close(assignments);
      })
    }
  }

}
