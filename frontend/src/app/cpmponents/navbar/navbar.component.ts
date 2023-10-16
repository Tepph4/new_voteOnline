import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitter } from 'src/app/emitter/emitter';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  authenticated=false

  constructor(private http: HttpClient){}
  ngOnInit(): void {
      Emitter.authEmitter.subscribe((auth:boolean)=>{
        this.authenticated=auth
  })  
  }
  logout():void{
    console.log('logout');    
     this.http.post<any>('http://localhost:3000/signout/logout',{},{withCredentials:true})
    .subscribe(()=> 
    {
      this.authenticated = false ;
      console.log(this.authenticated); 

    },    
    (error) => {
        console.error('Error during logout:', error);
      }
    ) 
  }
}
