import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCentersComponent } from './pages/admin/add-centers/add-centers.component';
import { CenterProfileComponent } from './pages/admin/center-profile/center-profile.component';
import { DisplayUserComponent } from './pages/admin/display-user/display-user.component';
import { EditCenterComponent } from './pages/admin/edit-center/edit-center.component';
import { EnterBillComponent } from './pages/admin/enter-bill/enter-bill.component';
import { HomepageAdminComponent } from './pages/admin/homepage-admin/homepage-admin.component';
import { ViewAppointmentComponent } from './pages/admin/view-appointment/view-appointment.component';
import { ViewBillComponent } from './pages/admin/view-bill/view-bill.component';
import { ForgetComponent } from './pages/auth/forget/forget.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { OtpComponent } from './pages/auth/otp/otp.component';
import { SetPasswordComponent } from './pages/auth/set-password/set-password.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { AppointmentComponent } from './pages/customer/appointment/appointment.component';
import { DashboardComponent } from './pages/customer/dashboard/dashboard.component';
import { HomepageComponent } from './pages/customer/homepage/homepage.component';
import { RouterPageComponent } from './pages/customer/router-page/router-page.component';
import { UpdateAppointmentComponent } from './pages/customer/update-appointment/update-appointment.component';
import { ViewBillCustomerComponent } from './pages/customer/view-bill-customer/view-bill-customer.component';

import { AdminGuard } from './service/admin.guard';
import { CustomerGuard } from './service/customer.guard';

const routes: Routes = [
  
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full'
  },
  {
    path:'setPassword/:this.email',
    component:SetPasswordComponent,
    pathMatch:'full'
  },
  {
    path:'otp/:this.out/:this.emailData.to',
    component:OtpComponent,
    pathMatch:'full'
  },
  {
    path:'forget',
    component:ForgetComponent,
    pathMatch:'full'
  },
  {
    path:'',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'admin',
    component:HomepageAdminComponent,
    // pathMatch:'full',
    canActivate:[AdminGuard],
    children:[
     
      {
        path:'editServiceCenter/:serviceCenterID',
        component:EditCenterComponent
      },
      {
        path:'viewAppointment/:serviceCenterID',
        component:ViewAppointmentComponent
      },
      {
        path:'displayUser',
        component:DisplayUserComponent
      },
      {
        path:'centerProfile',
        component:CenterProfileComponent
      },
      {
        path:'addCenters',
        component:AddCentersComponent
      },
      {
        path:'enterBill/:pId/:id',
        component:EnterBillComponent
      },
      {
        path:'viewBill/:pId',
        component:ViewBillComponent
      }
      
    ]
  },
  {
    path:'customer',
    component:RouterPageComponent,
    canActivate:[CustomerGuard],
    children:[
      {
        path:'user-homepage',
        component:HomepageComponent
      },
      {
        path:'Dashboard/:serviceCenterID',
        component:DashboardComponent
      },
      {
        path:'appointment/:id',
        component:AppointmentComponent
      },
      {
        path:'updateAppointment/:pId',
        component:UpdateAppointmentComponent
      },
      {
        path:'viewBill/:pId',
        component:ViewBillCustomerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
