import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {

  public showPassword: 
  boolean = false;
  public showPassword2: 
  boolean = false;
  userDataOr={
    
      email:'',
      password:'',
      username: '',
      name: '',
      mobileNumber:'',
      userRole: '',
      id: '',
  }
  password:any
  cnfpassword:any
  emailUser:any
  constructor(
    private _snack:MatSnackBar,
    private _route:ActivatedRoute,
    private _router:Router,
    private _login:LoginService
  ) { }

  userData:any
  ngOnInit(): void {

    this.emailUser =this._route.snapshot.params['this.email']
    this._login.getUserByEmail(this.emailUser).subscribe((data:any)=>{
      this.userData=data
    })
    
  }
  formSubmit(){
   
   
    
    if( this.password ==''||this.password==null){
      this._snack.open("password Required","Cancel",
      {duration:2000})
        return;
    }
    if(this.password.length < 8 ){
      this._snack.open("password  length should greater than  8 ","Cancel",
      {duration:2000})
        return;
  
    }
    if(this.cnfpassword ==''||this.cnfpassword==null){
      this._snack.open("Enter Confirm password Required","Cancel",
      {duration:2000})
        return;
    }
    if(this.cnfpassword == this.password){
      this.userDataOr.email=this.userData.email
      this.userDataOr.id=this.userData.id
      this.userDataOr.mobileNumber=this.userData.mobileNumber
      this.userDataOr.userRole=this.userData.userRole
      this.userDataOr.name=this.userData.name
      this.userDataOr.username=this.userData.username
      this.userDataOr.password=this.password
      this._login.updateUser(this.userDataOr).subscribe((success)=>{
        this._snack.open("Password Updated Successfully","Cancel",{duration:2000})
       
        
        
        this._router.navigate([''])
      },(error)=>{
        this._snack.open("Something Went Wrong","Cancel",{duration:2000})
      })
    }
    else{
      this._snack.open("Password and Confirmpassword doesn't match","cancel",{duration:3000})
    }
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  public togglePasswordVisibility1(): void {
    this.showPassword2 = !this.showPassword2;
  }
}
