import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { LocationStrategy } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public showPassword: 
  boolean = false;

  LoginData={
    email:'',
    password:''
  }

  loginData={
    username:'',
    password:''
  }

  constructor(private location: LocationStrategy,
    private _snake:MatSnackBar,private login:LoginService,private router:Router) { 
    history.pushState(null,window.location.href);  
    this.location.onPopState(() => {  
    history.pushState(null,  window.location.href);
});  
  }

  ngOnInit(): void {
  }
  formSubmit(){
    this.loginData.username = this.LoginData.email
    this.loginData.password = this.LoginData.password
    if(this.LoginData.email.trim()=='' || this.LoginData.email==null){
      this._snake.open("Email Required"," ",{duration:2000})
      this.LoginData.password=''
    }
    else if(this.LoginData.password.trim()==''|| this.LoginData.password==null){
      this._snake.open("Password Required","Cancel",{duration:2000});
      this.LoginData.email=''
      return;
    }

    this.login.LoginData(this.loginData,this.loginData.username).subscribe((data:any)=>{
    
      //login...
      this.login.loginUser(data.token);
      //refeer interceptor file
      this.login.getCurrentUser().subscribe((user:any)=>{
        this.login.setUser(user);
      
        if(this.loginData.password){
            // redirect if admin
          // redirect if normal 
          if(this.login.getUserRole()=='admin'){
            //adimin dashboard
            // window.location.href="/admin"
            this.router.navigate(['admin'])
            this.login.loginStatusSubject.next(true);
          }
          else if(this.login.getUserRole()=='customer'){
            //normal user
            // window.location.href="/user-dashboard"
            this.router.navigate(['customer'])
            this.login.loginStatusSubject.next(true);
          }
        }
        else{
          this._snake.open("Wrong Password","Cancel",{duration:2000})
          this.LoginData.email=''
          this.LoginData.password=''
          this.router.navigate([''])  
       } 
     })
    },
    (error)=>{
      this._snake.open("Credentials Invalid","Cancel",{duration:2000})
      this.LoginData.email=''
          this.LoginData.password=''
          this.router.navigate([''])  
    })
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
