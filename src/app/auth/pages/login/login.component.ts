import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  getAuthSub!: Subscription;
  isLoggingIn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Redirect away from login page if already logged in
    this.getAuthSub = this.authService.getAuth().subscribe( user => {
      if (user) {
        this.router.navigate(['/dashboard']);
      }
    })

    // Login form model
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  // Logging in handle function
  onLogin() {
    this.isLoggingIn = true;
    let {valid, value} = this.loginForm;
    let {email, password} = value;

    console.log(value);
    if (valid) {
      this.authService.login(email, password)
      .then(res => {
        this.isLoggingIn = false;
        // console.log(res)
        this.router.navigate(['/dashboard'])
      })
      .catch(err => {
        this.isLoggingIn = false;
      })
    } else {
      this.isLoggingIn = false;
    }
  }

  onGoogleSignUp() {
    this.isLoggingIn = true;
    this.authService.googleSignUp()
    .then( user => {
        // console.log(user);
        this.isLoggingIn = false;
        this.router.navigate(['/dashboard'])
      })
    .catch(err => {
      // console.log(JSON.stringify(err.message));
      this.isLoggingIn = false;
    })
  }


  ngOnDestroy(): void {
    if (this.getAuthSub) {
      this.getAuthSub.unsubscribe()
    }
  }
}
