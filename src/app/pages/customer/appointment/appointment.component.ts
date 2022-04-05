import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  id:any
  userData:any
  BookingData:any
  constructor(
    private login:LoginService,
    private product:ProductService,
    private _router: Router,
    private _route:ActivatedRoute,
    private _snack:MatSnackBar
    ) { }
    
  ngOnInit(): void {
    this.id = this._route.snapshot.params['id']
    this.fun()
  }
    fun(){
      this.product.getBookingDetail(this.id).subscribe((data:any)=>{
        this.BookingData = data
        console.log(this.BookingData);
        
    },(error)=>{
      console.log(error);
      
    })
    } 
    deleteBook(productId:any){
      console.log(productId);
      Swal.fire({
        icon:'warning',
        title:"Delete Appointment?",
        confirmButtonText:'Delete',
        
        showCancelButton:true,
      
      }).then((result)=>{
        if(result.isConfirmed)
        this.product.deleteBooking(productId).subscribe((success)=>{
          this.BookingData = this.BookingData.filter(
            (Product: any) =>
              Product.pId != productId
          );
          this._snack.open("Appointment Deleted","Cancel",{duration:2000})
        },(error)=>{
          this._snack.open("Something Went Wrong","Cancel",{duration:2000})
        })
        
      })
      
    }
}
