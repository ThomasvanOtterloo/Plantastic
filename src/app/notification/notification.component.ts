import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  template: `
    <div class="alert alert-success" [hidden]="displayNotification">
      <p>This website uses cookies to provide better user experience.</p>
      <button class="btn btn-success" (click)="closeNotification()">Accept</button>
    </div>
  `,
  styles: [
    ".notification-div{margin: 10px; padding: 10px; background-color: #FAD7A0; text-align: center; border: 1px solid #ccc; border-radius: 4px;}, p{font-size: 14px;}"

  ]
})
export class NotificationComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  displayNotification: boolean = false;

  closeNotification() {
    this.displayNotification = true;
  }

}
