import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Member } from '../_models/member';
import { map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  private http = inject(HttpClient);

  getMembers() {
    if (this.members.length > 0) return of(this.members);

    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      tap((members) => {
        this.members = members;
      })
    );
  }

  getMember(username: string) {
    const member = this.members.find((x) => x.username === username);

    if (member !== undefined) return of(member);

    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      tap(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }
}
