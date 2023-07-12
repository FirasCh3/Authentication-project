import {Component, OnInit} from '@angular/core';
import {httpRequests} from "../http";
import {EMPTY, Observable, of} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  data:any;
  constructor(private Request:httpRequests ) {

  }
  ngOnInit() {
      this.Request.GetAllUsers().subscribe((result)=>{
        this.data=result;
      })
  }

  DeleteUser(id: number){
    this.Request.DeleteUser(id).subscribe((res)=>{
      this.ngOnInit();
    });

}


}
