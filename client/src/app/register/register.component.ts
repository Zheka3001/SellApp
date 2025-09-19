import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);

  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  register() {
    this.accountService.register(this.model).subscribe(
      (respose) => console.log(respose),
      (error) => {
        console.log(error);
        this.toastr.error(error.error);
      }
    );
    this.cancel();
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
