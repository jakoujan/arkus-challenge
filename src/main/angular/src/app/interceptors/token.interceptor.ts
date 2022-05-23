import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';
import { constants } from 'src/environments/environment';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service';
import { ISession } from '../interfaces/entities';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private storage: SessionStorageService, private router: Router, private spinner: SpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinner.show("Cargando");
    const session: ISession = this.storage.retrieve(constants.SESSION);
    if (session) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${session.token}`
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
    }
    return next.handle(request).pipe(tap(evt => {
      if (evt instanceof HttpResponse) {
        this.spinner.hide();
      }
    },
      (err: any) => {
        this.spinner.hide();
        if (err instanceof HttpErrorResponse) {
          if (err.status === 500) {
            this.router.navigate(['login']);
          }
        }
      }));
  }
}