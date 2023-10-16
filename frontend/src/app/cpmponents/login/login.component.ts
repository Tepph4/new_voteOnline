import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './../../services/login/login.service';
import { Router } from '@angular/router';
import { NavbarComponent } from './../navbar/navbar.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  constructor( private lg: LoginService, private router: Router) { }
  ngOnInit(): void {
    
  }
  get username() { return this.loginForm.get('username'); }

  get password() { return this.loginForm.get('password'); }
  submit(): void {    
    if (this.loginForm.valid) {
      this.lg.login(this.loginForm.value).subscribe(        
        data => {
          alert('Login successfully');    
          console.log(data.username) 
          
          this.router.navigate(['home']).then(() => {
            location.reload();
          });
        },
        err => {
          alert('Cannot Login');
          console.log(err);
        }
      )
    }
    else {
      alert('Cannot Login');
    }
  }
}