import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminCenterService } from 'src/app/service/admin-center.service';
import { LoginService } from 'src/app/service/login.service';
import { ProductService } from 'src/app/service/product.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[DatePipe]
})
export class DashboardComponent implements OnInit {
  myDate = new Date();
  serviceCenterID = 0
  productDetails={
    productName:'',
    modelNumber:'',
    contactNumber:'',
    enterProblem:'',
    dateOfPurchase:'',
    user:{
      id:''
    },
    serviceCenter:{
        serviceCenterID:''
    }
   
}
  e:any
  userData:any
  constructor(
        private _admin_center:AdminCenterService,
        private _snake:MatSnackBar,
        private _route:ActivatedRoute,
        private _product:ProductService,
        private login:LoginService,
        private datePipe: DatePipe

  ) { }

  ngOnInit(): void {
    this.serviceCenterID = this._route.snapshot.params['serviceCenterID']
    // 
    this.login.getCurrentUser().subscribe((user:any)=>{
      this.userData = user
      console.log(this.userData);
      
        this.productDetails.user.id = this.userData.id
        console.log(this.productDetails.user.id);
        
    })
    // 
    this._admin_center.getServiceCenter(this.serviceCenterID).subscribe((data:any)=>{
      this.e = data
     

    },
    (error:any)=>{
      this._snake.open("Something Went Wrong !","Cancel",{duration:2000})
      return
    })
  }
  formSubmit(){
    // this.productDetails.serviceCenter.serviceCenterID= this.serviceCenterID
    if(this.productDetails.productName.trim()==''|| this.productDetails.productName.trim()==null){
      this._snake.open("product Name Required","Cancel",{duration:2000})
      return;
      
    }
    if(this.productDetails.modelNumber.trim()==''|| this.productDetails.modelNumber.trim()==null){
      this._snake.open("product model Number Required","Cancel",{duration:2000})
      return;
    }
    if(this.productDetails.contactNumber.trim() == ''|| this.productDetails.contactNumber.trim()==null){
      this._snake.open("product contact Number Required","Cancel",{duration:2000})
      return;
    }
    var s = (String)(this.productDetails.contactNumber)
    console.log(s.length);
    
    if(s.length < 10 || s.length>10 ){
      this._snake.open("Enter valid mobile number of length 10","Cancel",
      {duration:2000})
        return;
    }
    if(this.productDetails.enterProblem.trim() == ''|| this.productDetails.enterProblem.trim()==null){
      this._snake.open("product Describe Problem Required","Cancel",{duration:2000})
      return;
    }
    if(this.productDetails.dateOfPurchase.trim()!=''){
      let date3 = new Date(this.productDetails.dateOfPurchase)
    
      let date2 = new Date();
      let Time = date3.getTime() - date2.getTime(); 
      let Days = Time / (1000 * 3600 * 24);
      if(Days < 0){
        this._snake.open("Appointment Date Can not be less than the current date ","Cancel",{duration:5000})
        return
      }
      else if(Days>5){
        this._snake.open("Appointment Date must be within in 5 Days range from Current Date","cancel",{duration:5000})
        return
      }
      
    }
    this._product.addProduct(this.productDetails).subscribe((success)=>{
      console.log("Success");
      this._snake.open("Booking Successfull","Cancel",{duration:2000})
      this.productDetails=
      {
        productName:'',
        modelNumber:'',
        contactNumber:'',
        enterProblem:'',
        dateOfPurchase:'',
        serviceCenter:{
            serviceCenterID:''
        },
        user:{
          id:''
        }    
      };
    },(error:any)=>{
      console.log(error);
      this._snake.open("Error occur","Cancel",{duration:2000})
    })
  }
}
