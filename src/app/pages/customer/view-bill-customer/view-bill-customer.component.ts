import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-view-bill-customer',
  templateUrl: './view-bill-customer.component.html',
  styleUrls: ['./view-bill-customer.component.css'],
  providers:[DatePipe]

})
export class ViewBillCustomerComponent implements OnInit {
  pId:any
  productData:any
  date :any
  constructor(
    private _route:ActivatedRoute,
    private _product:ProductService,
    private _snack :MatSnackBar,
    public datepipe: DatePipe
  ) { }
  ngOnInit(): void {
    this.pId = this._route.snapshot.params['pId']
    this._product.getBillByProductId(this.pId).subscribe((data:any)=>{
      this.productData=data
      console.log(this.productData);
      
    },(error)=>{
      this._snack.open("Something Went Wrong","Cancel",{duration:2000})
    })
    this.date =this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  }
  
  f(){
    window.print()
  }

}
