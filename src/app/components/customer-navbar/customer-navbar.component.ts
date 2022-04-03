import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrls: ['./customer-navbar.component.css']
})
export class CustomerNavbarComponent implements OnInit {
  isLoggedIn = false;
  user = null;
  constructor(public login:LoginService,private router:Router) { }
  userData:any
  id:any
  ngOnInit(): void {
    console.log("Inside onit")
    this.isLoggedIn= this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data: any)=>{
      this.isLoggedIn= this.login.isLoggedIn();
      this.user = this.login.getUser();

    });
    this.login.getCurrentUser().subscribe((user:any)=>{
      this.userData = user
    
      this.id = this.userData.id
    })
  }
  
  public logout(){
    this.login.logout();
    // setting things null and false ,post logout
    this.isLoggedIn=false;
    this.user=null;
    
    this.router.navigate([''])
  }
   toggleMobileMenu(menu: { classList: { toggle: (arg0: string) => void; }; }) {
    menu.classList.toggle('open');
} 
}
