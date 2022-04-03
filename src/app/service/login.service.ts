
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  public loginStatusSubject = new Subject<boolean>();
  constructor(private http:HttpClient) { }
//current user
public getCurrentUser(){
  return this.http.get(`${baseUrl}/current-user`);
}
  //generate token
  public LoginData(loginData:any,role:any){
    if(role=='admin')
      return this.http.post(`${baseUrl}/admin/login`,loginData);
    return this.http.post(`${baseUrl}/user/login`,loginData);
  }

  //login user:set token user
  public loginUser(token:any){
    // in this way we store token from retun value from backend
    localStorage.setItem('token',token);
    return true ;
  }

  //isLogin:user is login or not
  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token')
    if(tokenStr==undefined||tokenStr==''|| tokenStr==null){
      return false;
    }else{
      return true;
    }
  }

  //logout:remove token from local stroage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }
  
  //get token
  public getToken(){
      return localStorage.getItem('token');
  }
  //set UserDetail
  //json to string
  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user))
  }
  //get User
  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr!=null){
      return JSON.parse(userStr)
    }else{
      this.logout();
      return null;
    }
 }
  //get user role
  public getUserRole(){
    let user = this.getUser()
    return user.authorities[0].authority
  }
  //otp 
  public sendEmail(emailData:any){
    return this.http.post(`${baseUrl}/sendEmail`,emailData);
  }

  public getUserByEmail(email:any){
    return this.http.get(`${baseUrl}/getUserByEmail/${email}`)
  }
  public updateUser(data:any){
    return this.http.put(`${baseUrl}/user/updateUser`,data);
  }
}
