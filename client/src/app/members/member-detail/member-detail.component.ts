import { Component, inject, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem } from '@daelmaak/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  standalone: false,
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
})
export class MemberDetailComponent implements OnInit {
  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);

  member!: Member;
  images: GalleryItem[] = [];
  selectedItem?: GalleryItem;
  showDescriptions = false;

  ngOnInit(): void {
    this.loadMember();
  }

  getImages(): GalleryItem[] {
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        src: photo.url,
        thumbSrc: photo.url,
      });
    }

    return imageUrls;
  }

  loadMember() {
    this.memberService
      .getMember(this.route.snapshot.paramMap.get('username') ?? '')
      .subscribe((member) => {
        this.member = member;
        this.images = this.getImages();
      });
  }
}
