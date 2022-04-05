import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  emailData={
    to:'',
    subject:'',
    message:''
  }
  dataRec:any
  constructor(private router:Router,private login:LoginService,private _snake:MatSnackBar) { }

  ngOnInit(): void {
  }
  generateRandomNumber() {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math
    .random() * (maxm - minm + 1)) + minm;
}

  out:any
  formSubmit(){
      if(this.emailData.to==null || this.emailData.to==''){
        this._snake.open("Enter Registered Email","Cancel",{duration:2000})
        return
      }
      this.out= this.generateRandomNumber();
      
      this.emailData.message = this.out.toString();
      this.emailData.subject="Otp for set new Password"
      
      this.login.sendEmail(this.emailData).subscribe((data:any)=>{
        this.dataRec = data
      })
      
      this.out = (this.out*153);
      this.router.navigate(['/otp', this.out ,this.emailData.to])
  }
}
