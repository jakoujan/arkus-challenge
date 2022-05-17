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

  private static USER_API = 'api/users/';

  constructor(protected http: HttpClient) {
    super();
  }

  public getUsers(filter: IUserFilter): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>(UserService.USER_API);
  }

  public getUser(id: number): Observable<IResponse> {
    let params = [id];
    return this.http.get<IResponse>(Service.appendParams(UserService.USER_API, params));
  }

  public createUser(user: IUser): Observable<IResponse> {
    return this.http.post<IResponse>(UserService.USER_API, user);
  }

  public updateUser(id: number, user: IUser): Observable<IResponse> {
    let params = [id];
    return this.http.put<IResponse>(Service.appendParams(UserService.USER_API, params), user);
  }

  public deleteUser(id: number): Observable<any> {
    let params = [id];
    return this.http.delete<any>(Service.appendParams(UserService.USER_API, params));
  }
}