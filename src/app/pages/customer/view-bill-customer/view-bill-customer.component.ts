import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { DatePipe } from '@angular/common';
import * as $ from "jquery";
import { UserService } from 'src/app/service/user.service';
import { WindowRefService } from 'src/app/window-ref.service';
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
    public datepipe: DatePipe,
    private _user:UserService,
    private winRef: WindowRefService
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
  amountData={
    amount:'',
    message:''
  }
  pay(){
    console.log(this.productData.repair_Cost)
    if(this.productData.repair_Cost==0||this.productData.repair_Cost==''||this.productData.repair_Cost==null){
      this._snack.open("Payment Amount is either 0 or Invalid Amount")
      return
    }
    this.amountData.amount = this.productData.repair_Cost;
    this.amountData.message="Bill Payment"
    this._user.payment(this.amountData).subscribe((data:any)=>{
      console.log(data)
      if(data.status=='created'){
        this.payWithRazor(data,data.id);
      //   let options={
      //     key:"rzp_test_GZrvBqvL6b69GM",
      //     amount:data.amount,
      //     currency:"INR",
      //     name:"Mixer Grinder Service",
      //     description:"Pay Bill",
      //     image:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fecommercenews.eu%2Fwp-content%2Fuploads%2F2013%2F06%2Fmost_common_payment_methods_in_europe.png&imgrefurl=https%3A%2F%2Fecommercenews.eu%2Fthe-most-common-payment-methods-in-europe%2F&tbnid=NxErbNWFpnRujM&vet=12ahUKEwjPgKKK4Pn2AhX9YmwGHd5gDwQQMygCegUIARDYAQ..i&docid=WhPyTGJ3qcli4M&w=740&h=393&q=payment&ved=2ahUKEwjPgKKK4Pn2AhX9YmwGHd5gDwQQMygCegUIARDYAQ",
      //     order_id:data.id,
      //     handler:function(response:any){
      //       console.log(response.razorpay_payment_id)
      //       console.log(response.razorpay_order_id)
      //       console.log(response.razorpay_signature)
      //       console.log('payment successful')
      //       alert("Payment Successfull")
      //     },
      //     prefill: {
      //         name: this.productData.customer_name,
      //         contact: this.productData.customer_contact      
      //       },
      //       notes: {
      //         Details: "Mixer Service Bill Amount"
      //     },
      //     theme: {
      //         color: "#3399cc"
      //     },
          
      //   };
      //   var rzp1 = new Razorpay(options);
      //   rzp1.on('payment.failed', function (response:any){
      //   alert(response.error.code);
      //   alert(response.error.description);
      //   alert(response.error.source);
      //   alert(response.error.step);
      //   alert(response.error.reason);
      //   alert(response.error.metadata.order_id);
      //   alert(response.error.metadata.payment_id);
      //     });
      //     rzp1.open();
          
       }
     
    },(error)=>{
      alert("Something went wrong")
      console.log(error);
      
    });
   }
   payWithRazor(data:any,val:any) {
    const options: any = {
      key: 'rzp_test_GZrvBqvL6b69GM',
      amount: data.amount, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'Mixer Grinder Service', // company name or product name
      description: "Pay Bill",  // product description
      image: "https://ecommercenews.eu/wp-content/uploads/2013/06/most_common_payment_methods_in_europe.png", // company logo or product image
      order_id: val, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        Details: "Mixer Service Bill Amount"
      },
     
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response:any, error:any) => {
      options.response = response;
      console.log(response);
      console.log(options);
      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }

}
