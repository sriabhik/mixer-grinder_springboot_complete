import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }
  public addUser(user:any,userRole:any){
   if(userRole=='customer')
      return this._http.post(`${baseUrl}/user/signup`,user);
    return this._http.post(`${baseUrl}/admin/signup`,user);
  
  }
  public payment(data:any){
    return this._http.post(`${baseUrl}/user/create_order`,data);
  }
}
