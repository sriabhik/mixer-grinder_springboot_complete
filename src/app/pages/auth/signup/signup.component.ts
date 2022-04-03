import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

interface datatype {
 
  email:string,
  username:string,
  mobileNumber:number,
  password : any,
  confirmPassword:any,
  userRole:string
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public showPassword: 
  boolean = false;
  public showPassword2: 
  boolean = false;
  public user={
   
    email:'',
    username:'',
    mobileNumber:'',
    password : '',
    confirmPassword:'',
    userRole:'',
    name:''
  }
  constructor(  private userService :UserService,
                private snack:MatSnackBar,
                private _route:Router
                ) { } 

  ngOnInit(): void {
  }
  formSubmit(){
    this.user.userRole='customer';
    if((this.user.userRole!=='admin' && this.user.userRole!='customer') ){
      this.snack.open("Enter admin/customer","Cancel",
      {duration:2000})
      this.f()
        return;
    }
    if(this.user.email==''||this.user.email==null){
      this.snack.open("Email Required","Cancel",
      {duration:2000})
        return;
    }
    if(!this.user.email.includes(".")){
      this.snack.open("Invalid Email ","Cancel",
      {duration:2000})
        return;
    }
    if(this.user.name ==''||this.user.name==null){
      this.snack.open("Name Required","Cancel",
      {duration:2000}) 
        return;
    }
    
    
    if(this.user.mobileNumber ==''||this.user.mobileNumber==null){
      this.snack.open("mobileNumber Required","Cancel",
      {duration:2000})
        return;
    }
   
    var s = (String)(this.user.mobileNumber)
   
    
    if(s.length < 10 || s.length>10 ){
      this.snack.open("Enter valid mobile number of length 10","Cancel",
      {duration:2000})
        return;
    }

    if( this.user.password ==''||this.user.password==null){
      this.snack.open("password Required","Cancel",
      {duration:2000})
        return;
    }
    if(this.user.password.length < 8 ){
      this.snack.open("password  length should greater than  8 ","Cancel",
      {duration:2000})
        return;
  
    }
    if(this.user.confirmPassword ==''||this.user.confirmPassword==null){
      this.snack.open("Enter Confirm password Required","Cancel",
      {duration:2000})
        return;
    }
    if(this.user.confirmPassword == this.user.password){
      this.userService.addUser(this.user,this.user.userRole).subscribe(
        (data)=>{
          //success
          this.snack.open("Registration Successfull","Cancel",{
            duration:2000})
            this.f()
          
        },
        (error)=>
        {
          //fail
          console.log(error)
          this.f()
          this.snack.open("User Already Registered Or  Try again","Cancel",{duration:2000,verticalPosition:'top',horizontalPosition:'left'})    
        }
      );
    }
    else{
     
      this.snack.open("Password and Confirmpassword doesn't match","cancel",{duration:3000})
      
    }
    
  }
  f(){
    this.user={
   
      email:'',
      username:'',
      mobileNumber:'',
      password : '',
      confirmPassword:'',
      userRole:'',
      name:''
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  public togglePasswordVisibility1(): void {
    this.showPassword2 = !this.showPassword2;
  }
}
