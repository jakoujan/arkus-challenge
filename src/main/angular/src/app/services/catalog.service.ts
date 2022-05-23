import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccount, IUser } from '../interfaces/entities';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class CatalogService extends Service {

  private static PATH_ACCOUNTS = '/api/catalogs/accounts';
  private static PATH_USERS = '/api/catalogs/users';
  private static PATH_AVAILABLE_USERS = '/api/catalogs/users/available';

  constructor(protected http: HttpClient) {
    super();
  }

  public accounts(): Observable<Array<IAccount>> {
    return this.http.get<Array<IAccount>>(CatalogService.PATH_ACCOUNTS);
  }

  public users(): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>(CatalogService.PATH_USERS);
  }


}