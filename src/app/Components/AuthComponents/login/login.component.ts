import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from '../../../Services/AuthService/auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  loginForm!: FormGroup;
  error: boolean = false;
  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }
  onSubmit() {
    this.authService.Login(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('email', response.email);
        console.log(response); // res Data .
        this.error = false;
           this.router.navigate(['/confirm-code']);
      },
      error: (error) => {
        this.error = true;
        this.errorMessage = error?.error?.error || 'An unknown error occurred';
        console.log(error); //  res Data .
      }
    })
  }
}


