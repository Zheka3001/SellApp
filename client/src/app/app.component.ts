import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private accountService = inject(AccountService);

  title = 'Sell App';

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user') ?? '{}') as User;
    this.accountService.setCurrentUser(user);
  }

  ngOnInit(): void {
    this.setCurrentUser();
  }
}
