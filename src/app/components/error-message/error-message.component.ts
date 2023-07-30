import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent  implements OnInit {

  @Input() message: any;
  @Input() field: any;
  @Input() error: any;

  constructor() { }

  ngOnInit() {}

  shouldShowComonent() {
    if(this.field.touched && this.field.errors?.[this.error]) {
      return true;
    } else {
      return false;
    }
  }

}
