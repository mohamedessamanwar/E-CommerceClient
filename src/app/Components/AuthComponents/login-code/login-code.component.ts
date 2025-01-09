import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/AuthService/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ILogicCode } from '../../../Modules/logic-code';
@Component({
  selector: 'app-login-code',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-code.component.html',
  styleUrl: './login-code.component.css'
})
export class LoginCodeComponent {
  loginForm!:FormGroup ;
  error:boolean = false;
  errorMessage:string = "";

  constructor(private authService: AuthService, private router: Router) {

    this.loginForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {  
    let Code:ILogicCode = {
      code: this.loginForm.get('code')?.value , 
      email : localStorage.getItem('email') ?? ''
      
    }
    this.authService.LoginCode(Code).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.authService.isLogin.next(true);
        console.log(response); // res Data .
        this.error = false;
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.error = true;
        this.errorMessage = error?.error?.error//.split(',')[1] || 'An unknown error occurred';
        console.log(error); //  res Data .
      }
    })
    }

   }
