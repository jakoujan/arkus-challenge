import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccountFilter } from '../filters/filters';
import { IAccount, IResponse } from '../interfaces/entities';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends Service {

  private static USER_API = 'api/accounts/';

  constructor(protected http: HttpClient) {
    super();
  }

  public getAccounts(filter: IAccountFilter): Observable<Array<IAccount>> {
    return this.http.get<Array<IAccount>>(AccountService.USER_API);
  }

  public getAccount(id: number): Observable<IResponse> {
    let params = [id];
    return this.http.get<IResponse>(Service.appendParams(AccountService.USER_API, params));
  }

  public createAccount(account: IAccount): Observable<IResponse> {
    return this.http.post<IResponse>(AccountService.USER_API, account);
  }

  public updateAccount(id: number, account: IAccount): Observable<IResponse> {
    let params = [id];
    return this.http.put<IResponse>(Service.appendParams(AccountService.USER_API, params), account);
  }

  public deleteAccount(id: number): Observable<any> {
    let params = [id];
    return this.http.delete<any>(Service.appendParams(AccountService.USER_API, params));
  }
}
