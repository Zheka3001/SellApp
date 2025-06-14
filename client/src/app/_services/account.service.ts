import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  private httpClient = inject(HttpClient);

  login(model: any) {
    return this.httpClient
      .post<User>(this.baseUrl + 'account/login', model)
      .pipe(
        map((response: User) => {
          const user = response;

          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
          }
        })
      );
  }

  register(model: any) {
    return this.httpClient
      .post<User>(this.baseUrl + 'account/register', model)
      .pipe(
        map((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
          }
        })
      );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
