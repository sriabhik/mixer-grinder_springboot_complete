import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { ForgetComponent } from '../forget/forget.component';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  out:any
  dataRec:any
  emailData={
    to:'',
    subject:'',
    message:''
  }
  val:any
  email:any
  constructor(
      private router:Router,
      private login:LoginService,
      private _for:ForgetComponent,
      private _snack:MatSnackBar,
      private _route:ActivatedRoute,
      private _router:Router
      ) { }
  
  ngOnInit(): void {
    this.val =this._route.snapshot.params['this.out']
    this.email =this._route.snapshot.params['this.emailData.to']
    
  }
  data:any
  p:any
  formSubmit1(){
    var s = (String)(this.val)
    if(s.length<=6){
      
     
      this.p = this.val.toString(); 
  
      if(this.data.trim()==this.p.trim()){
        this._snack.open("OTP Verfied","Cancel",{duration:2000})
        this._router.navigate(['/setPassword',this.email])
      }
      else{
        this._snack.open("wrong OTP entered","Cancel",{duration:2000})
      }
    }
    else{
    
      this.val = Math.floor(this.val/153);
      this.p = this.val.toString();   
      if(this.data.trim()==this.p.trim()){
        this._snack.open("OTP Verfied","Cancel",{duration:2000})
        this._router.navigate(['/setPassword',this.email])
      }
      else{
        this._snack.open("wrong OTP entered","Cancel",{duration:2000})
      }
    }
    
  }
 
  generateRandomNumber() {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math
    .random() * (maxm - minm + 1)) + minm;
}

  fun(){
    
    
      this.out= this.generateRandomNumber();
   
      this.emailData.to=this.email
      this.emailData.message = this.out.toString();
      this.emailData.subject="Otp for set new Password"
     
      this.login.sendEmail(this.emailData).subscribe((data:any)=>{
        this.dataRec = data
      })
      this.val = (this.out*153);
  }
}
