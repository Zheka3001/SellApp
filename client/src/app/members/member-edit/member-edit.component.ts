import {
  Component,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Member } from '../../_models/member';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { filter, Observable, switchMap, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  standalone: false,
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css',
})
export class MemberEditComponent implements OnInit {
  private accountService = inject(AccountService);
  private memberServce = inject(MembersService);
  private toastr = inject(ToastrService);

  @ViewChild('editForm') editForm!: NgForm;

  user$ = this.accountService.currentUser$.pipe(filter(Boolean), take(1));
  member!: Member;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  ngOnInit(): void {
    this.getMember();
  }

  getMember() {
    this.user$
      .pipe(switchMap((user) => this.memberServce.getMember(user.userName)))
      .subscribe((member) => (this.member = member));
  }

  updateMember() {
    this.memberServce.updateMember(this.member).subscribe(() => {
      this.toastr.success('Profile updated successfully');
      this.editForm.reset(this.member);
    });
  }
}
