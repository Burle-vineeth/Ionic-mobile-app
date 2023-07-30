import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(
    private router: Router,
  ) {}

  ngOnInit() {}

  addingClass(event: any) {
    if(event.target.className) {
      event.target.className = '';
    } else {
      event.target.className = 'focus';
    }
  } 

  register() {
    this.router.navigate(['home']);
  }
}
