import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAssignmentViewFilter } from '../filters/filters';
import { IAssignment, IAssignmentView, IResponse } from '../interfaces/entities';
import { IUsersToAssign } from '../interfaces/request';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService extends Service {


  private static API_ASSIGNMENT = 'api/assignments/';
  private static API_CREATE_ASSIGNMENTS = 'api/assignments/create';

  constructor(protected http: HttpClient) {
    super();
  }

  public getAssignments(filter: IAssignmentViewFilter): Observable<Array<IAssignmentView>> {
    return this.http.get<Array<IAssignmentView>>(AssignmentService.API_ASSIGNMENT);
  }

  public getAssignmentsByUser(userId: number): Observable<Array<IAssignmentView>> {
    let params = [userId];
    return this.http.get<Array<IAssignmentView>>(Service.appendParams(AssignmentService.API_ASSIGNMENT, params));
  }

  public createAssignments(data: IUsersToAssign) {
    return this.http.post<IResponse>(AssignmentService.API_CREATE_ASSIGNMENTS, data);
  }

  public getAssignment(id: number): Observable<IResponse> {
    let params = [id];
    return this.http.get<IResponse>(Service.appendParams(AssignmentService.API_ASSIGNMENT, params));
  }

  public createAssignment(assignment: IAssignment): Observable<IResponse> {
    return this.http.post<IResponse>(AssignmentService.API_ASSIGNMENT, assignment);
  }

  public updateAssignment(id: number, assignment: IAssignment): Observable<IResponse> {
    let params = [id];
    return this.http.put<IResponse>(Service.appendParams(AssignmentService.API_ASSIGNMENT, params), assignment);
  }

  public deleteAssignment(id: number): Observable<any> {
    let params = [id];
    return this.http.delete<any>(Service.appendParams(AssignmentService.API_ASSIGNMENT, params));
  }
}
