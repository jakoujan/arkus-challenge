import { Injectable } from '@angular/core';
import { IParam, Service } from './service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse, IUser } from '../interfaces/entities';
import { IUserFilter } from '../filters/filters';

@Injectable({
  providedIn: 'root'
})
export class UserService extends Service {

  private static API_USER = 'api/users/';
  private static API_USER_ASSIGNED = 'api/users/assigned';
  private static PATH_AVAILABLE_USERS = '/api/users/available';


  constructor(protected http: HttpClient) {
    super();
  }

  public getUsers(filter: IUserFilter): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>(UserService.API_USER);
  }

  public getUser(id: number): Observable<IUser> {
    let params = [id];
    return this.http.get<IUser>(Service.appendParams(UserService.API_USER, params));
  }

  public createUser(user: IUser): Observable<IResponse> {
    return this.http.post<IResponse>(UserService.API_USER, user);
  }

  public updateUser(id: number, user: IUser): Observable<IResponse> {
    let params = [id];
    return this.http.put<IResponse>(Service.appendParams(UserService.API_USER, params), user);
  }

  public deleteUser(id: number): Observable<any> {
    let params = [id];
    return this.http.delete<any>(Service.appendParams(UserService.API_USER, params));
  }

  public getAssignedUsers(accountId: number): Observable<Array<IUser>> {
    let params = [accountId];
    return this.http.get<Array<IUser>>(Service.appendParams(UserService.API_USER_ASSIGNED, params));
  }

  public availableusers(): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>(UserService.PATH_AVAILABLE_USERS);
  }
}