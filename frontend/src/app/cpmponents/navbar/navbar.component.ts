import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitter } from 'src/app/emitter/emitter';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  authenticated = false
  resule?: any
  massage?: string
  role?: string
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    Emitter.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    }   
    );    
    this.getItem();
  }
  getItem(){
    this.http.get('http://localhost:3000/user/getUser', {
      withCredentials: true
    }).subscribe((res: any) => {
      this.massage = `Hi ${res.username}..`;
      this.resule = `${res.image}`;
      this.role = `${res.role}`;     
      Emitter.authEmitter.emit(true)

    },
      err => {
        this.massage = "You are not login";
        Emitter.authEmitter.emit(false)
      }
    )
  }
  logout(): void {
    console.log('logout');
    localStorage.removeItem('token');
    localStorage.removeItem('data');
    localStorage.removeItem('jwt');
    this.http.post<any>('http://localhost:3000/signout/logout', {}, { withCredentials: true })
      .subscribe(() => {
        this.authenticated = false;
        console.log(this.authenticated);
        setTimeout(() => {
          location.reload();
        }, 10);

      },
        (error) => {
          console.error('Error during logout:', error);
        }
      )

  }

}
