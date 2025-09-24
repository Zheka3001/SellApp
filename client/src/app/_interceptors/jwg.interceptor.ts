import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { filter, Observable, take } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private accountService = inject(AccountService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.accountService.currentUser$
      .pipe(filter(Boolean), take(1))
      .subscribe((user) => {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      });

    return next.handle(req);
  }
}
