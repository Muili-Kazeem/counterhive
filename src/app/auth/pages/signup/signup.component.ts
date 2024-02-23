import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm!: FormGroup;
  getAuthSub!: Subscription;
  isSigningUp: boolean = false;

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
    });

    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSignup() {
    this.isSigningUp = true;
    let {valid, value} = this.signupForm;
    let {email, password} = value;

    if (valid) {
      this.authService.signup(email, password)
      .then(res => {
        // console.log(res)
        this.isSigningUp = false;
        this.router.navigate(['/dashboard'])
      })
      .catch(err => {
        // console.log(err);
        this.isSigningUp = false;
      })
    }
  }

  onGoogleSignUp() {
    this.isSigningUp = true;
    this.authService.googleSignUp()
    .then( user => {
        // console.log(user);
        this.isSigningUp = false;
        this.router.navigate(['/dashboard']);
      })
    .catch(err => {
      this.isSigningUp = false;
    })
  }


  ngOnDestroy(): void {
    if (this.getAuthSub) {
      this.getAuthSub.unsubscribe()
    }
  }

}
