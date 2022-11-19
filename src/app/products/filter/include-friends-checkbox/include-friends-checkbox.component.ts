import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-include-friends-checkbox',
  templateUrl: './include-friends-checkbox.component.html',
  styleUrls: ['./include-friends-checkbox.component.css']
})
export class IncludeFriendsCheckboxComponent implements OnInit {
  hasFriends: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log(this.hasFriends)
  }

  setAll(checked: boolean) {
    console.log(checked)
  }
}
