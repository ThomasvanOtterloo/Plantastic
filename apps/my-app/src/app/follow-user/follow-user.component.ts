import {Component, Input} from '@angular/core';
import {FollowUserService} from "../products/followUser.service";
import {User} from "@find-a-buddy/data";
import {AuthService} from "@find-a-buddy/auth-ui";

@Component({
  selector: 'follow-user',
  templateUrl: './follow-user.component.html',
  styleUrls: ['./follow-user.component.scss']
})
export class FollowUserComponent {
  followState: string = "Follow"; // bind to the button-text
  followingList: any = [];
  userId?: string = this._authService.currentUser$.value?.id;

  @Input() productAuthorId!: string;
  @Input() authorName!: string;

    constructor(
        private _followUserService: FollowUserService,
        private _authService: AuthService
    ) {
    }

    ngOnInit(): void {

        this._followUserService.getAllFollowers().subscribe(
            response => {
                this.followingList = response[0].following;
                console.log('followingList',this.followingList);
                const following = this.followingList.map((following: any) => following[0].id);
                console.log('following',following);
                console.log('afadsfadsf',this.userId)
                following.forEach((following: any) => {
                    if (following === this.productAuthorId) {
                        this.followState = "Unfollow";
                    }
                });
            }
        );
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
