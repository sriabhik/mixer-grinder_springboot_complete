import { Component, OnInit } from '@angular/core';
import { AddCenterService } from 'src/app/service/add-center.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public centerData: any;
  serviceCenterName:any
  out ="No Match Found"
  constructor(
    private _api: AddCenterService
  ) { }

  ngOnInit(): void {
    console.log("Homepage")
    this._api.getCenter().subscribe((data:any) => (this.centerData = data));
  }
  Search(){
    if(this.serviceCenterName==''){
      this.ngOnInit();
    }else{
      this.centerData = this.centerData.filter((res:any)=>{
        
          return res.serviceCenterName.toLocaleLowerCase().match(this.serviceCenterName.toLocaleLowerCase());
          
      })
    }
  }
  onSearchClear() {
    this.serviceCenterName = '';
    this.Search();
  }
}
