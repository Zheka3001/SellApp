import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  private http = inject(HttpClient);

  title = 'Sell App';
  users: any;

  ngOnInit(): void {
    this.http.get("https://localhost:5001/api/users").subscribe(response => {
      this.users = response
    }, error => {
      console.log(error)
    })
  }
}
