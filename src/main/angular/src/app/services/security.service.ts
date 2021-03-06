import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { IResponse, IUser } from '../interfaces/entities';
import { Service } from "./service";
import { ICredentialRequest } from '../interfaces/request';

@Injectable({
  providedIn: 'root'
})
export class SecurityService extends Service {

  private static LOGIN = '/auth/login';
  private static LOGOUT = '/auth/logout';

  private accessorEmitter: Subject<IUser> = new Subject<IUser>();

  constructor(protected http: HttpClient) {
    super();
  }

  public login(credentials: ICredentialRequest): Observable<IResponse> {
    return this.http.post<IResponse>(SecurityService.LOGIN, credentials);
  }

  public setUserData(): Observable<IUser> {
    return this.accessorEmitter.asObservable();
  }

  public updateUserData(user: IUser) {
    this.accessorEmitter.next(user);
  }

  public logout(): Observable<IResponse> {
    return this.http.get<IResponse>(SecurityService.LOGOUT);
  }
}