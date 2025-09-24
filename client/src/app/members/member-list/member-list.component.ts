import { Component, inject, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';

@Component({
  selector: 'app-member-list',
  standalone: false,
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
  members: Member[] = [];

  private memberService = inject(MembersService);

  ngOnInit(): void {
    this.loadMemebers();
  }

  loadMemebers() {
    this.memberService.getMembers().subscribe((members) => {
      this.members = members;
    });
  }
}
