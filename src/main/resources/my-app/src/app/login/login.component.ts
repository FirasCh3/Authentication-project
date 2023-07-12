import {Component, OnInit} from '@angular/core';
import {httpRequests} from "../http";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  ngOnInit() {
    localStorage.removeItem("token");
  }

  constructor(private Request:httpRequests,private router:Router) {
  }
  group=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.minLength(8)])
  },[],this.restricted.bind(this));
  UserDoesNotExist(UserData:any,UserInput:any):boolean{
    let i=0;
    let UserExistenceTest:boolean=false;
    while(i<UserData.length && !UserExistenceTest){
      if(UserInput.email==UserData[i].email && UserInput.password==UserData[i].password){
        UserExistenceTest=true;
      }else{
        i++;
      }
    }
    return UserExistenceTest;
  }
  restricted(control:AbstractControl):Promise<any>|Observable<any>{
    let observable=this.Request.GetAllUsers().pipe(map(data=>{
      if(!this.UserDoesNotExist(data,control.value)){
        return({error:false})
      }else{
        return null;
      }
    }))
    return observable;
  }
  submit(info:any){
      this.Request.Login(info).subscribe((response:any)=>{
        if(response!=null){
          localStorage.setItem('token',response.token);
          this.router.navigate(["/home"]).then();
        }
      })
  }
  SignUp(){
    this.router.navigate(["/signup"]).then();
  }
}
