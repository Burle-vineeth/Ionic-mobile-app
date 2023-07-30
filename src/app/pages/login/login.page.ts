import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.actions';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { LoginState } from 'src/store/login/LoginState';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm : FormGroup = this.fb.group( {
    email : ['', [Validators.required,Validators.email]],
    password: ['',[Validators.required]],
  });

  loginStateSubscription !: Subscription;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private toastController: ToastController,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.loginStateSubscription = this.store.select('login').subscribe( (loginState) => {
      this.onIsRecoveredPassword(loginState);
      this.onIsRecoveringPassword(loginState);
      this.onError(loginState);

      this.onIsLoggingIn(loginState);
      this.onIsLoggedIn(loginState);

      this.toggleLoading(loginState);
    });
  }

  ngOnDestroy() {
    if(this.loginStateSubscription) {
      this.loginStateSubscription.unsubscribe();
    }
  }

  private toggleLoading(loginState: LoginState) {
    if(loginState.isLoggingIn || loginState.isRecoveringPassword) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private onIsLoggedIn(loginState: LoginState) {
    if(loginState.isLogedIn) {
      this.router.navigate(['home']);
    }
  }

  private onIsLoggingIn(loginState: LoginState) {
    if(loginState.isLoggingIn) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService.login(email,password).subscribe(user => {
        this.store.dispatch(loginSuccess({user}));
      }, error => {
        this.store.dispatch(loginFail({error}));
      });
    }
  }

  private async onError(loginState: LoginState) {
    if(loginState.error) {
      this.toggleLoading(loginState);
      const toaster = await this.toastController.create( {
        position: "bottom",
        message: loginState.error.message,
        color: "danger",
      });
      toaster.present();
    }
  }

  private onIsRecoveringPassword(loginState: LoginState) {
    if(loginState.isRecoveringPassword) {
      this.toggleLoading(loginState);

      this.authService.recoverEmailPassword(this.loginForm.get('email')?.value).subscribe( () => {
        this.store.dispatch(recoverPasswordSuccess());
      }, error => {
        this.store.dispatch(recoverPasswordFail({error}))
      });
    }
  }

  private async onIsRecoveredPassword(loginState: LoginState) {
    if(loginState.isRecoveredPassword) {
      this.toggleLoading(loginState);
      const toaster = await this.toastController.create({
        position: "bottom",
        message: "Recovery email sent",
        color: "primary",
      });
      toaster.present();
    }
  }

  addingClass(event: any) {
    event.target.className = 'focus';
  } 
  
  removeingClass(event : any) {
    event.target.className = '';
  }

  login() {
    this.store.dispatch(login());
  }

  register() {
    setTimeout( () => {
      this.router.navigateByUrl('register');
    },1000);
  }

  forgotEmailPassword() {

    this.store.dispatch(recoverPassword());
    // this.store.dispatch( show() );
    // setTimeout( () => {
    //   this.store.dispatch( hide() );
    // },3000)
  }

}
