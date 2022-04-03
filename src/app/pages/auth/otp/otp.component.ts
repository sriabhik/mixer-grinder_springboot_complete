import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgetComponent } from '../forget/forget.component';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  constructor(
      private _for:ForgetComponent,
      private _snack:MatSnackBar,
      private _route:ActivatedRoute,
      private _router:Router
      ) { }
  val:any
  email:any
  ngOnInit(): void {
    this.val =this._route.snapshot.params['this.out']
    this.email =this._route.snapshot.params['this.emailData.to']
    
  }
  data:any
  p:any
  formSubmit(){
      
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
