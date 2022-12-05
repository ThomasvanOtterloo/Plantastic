import {Component, Input} from '@angular/core';
import {FollowUserService} from "./followUser.service";
import {User} from "@find-a-buddy/data";

@Component({
  selector: 'follow-user',
  templateUrl: './follow-user.component.html',
  styleUrls: ['./follow-user.component.scss']
})
export class FollowUserComponent {
  followState: string = "Follow"; // bind to the button-text
  followingList: any = [];

  @Input() productAuthorId!: string;
  @Input() authorName!: string;

    constructor(
        private _followUserService: FollowUserService
    ) {
    }

    ngOnInit(): void {
        this._followUserService.getAllFollowers().subscribe(
            response => {
                this.followingList = response.map((user: User) => user.following);
                console.log('response', JSON.stringify(response.map((user: User) => user.following)));
                console.log('response', this.followingList);
                this.followingList.forEach((user: User) => {
                    if (user.id === this.productAuthorId) {
                        this.followState = "Unfollow";
                    } else {
                        this.followState = "Follow";
                    }
                });
        });
    }

    followUser() {
        console.log("Follow user with id: " + this.productAuthorId);
        if (this.followState === "Follow") {
            this._followUserService.followUser(this.authorName).subscribe(
                response => {
                    console.log('response',response);
                    this.followState = "Unfollow";
                });
        } else {
            this._followUserService.unfollowUser(this.authorName).subscribe(
                response => {
                    console.log('response',response);
                    this.followState = "Follow";
                });
        }
    }
}
