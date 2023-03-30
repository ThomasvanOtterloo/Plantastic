import { Component, EventEmitter, OnInit, Output ,OnChanges} from '@angular/core';
import {FollowUserService} from "../../followUser.service";

@Component({
  selector: 'app-include-friends-checkbox',
  templateUrl: './include-friends-checkbox.component.html',
  styleUrls: ['./include-friends-checkbox.component.css']
})
export class IncludeFriendsCheckboxComponent implements OnInit {
  products: any = [];

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  @Output() getBoolean = new EventEmitter<boolean>();

  setAll(checked: boolean) {
    console.log('2',checked)
    this.getBoolean.emit(checked);
  }
}
