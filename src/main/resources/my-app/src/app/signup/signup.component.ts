import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {resolve} from "@angular/compiler-cli";
import {httpRequests} from "../http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  ngOnInit() {
    this.group.get("passwordconfirm")?.disable();
  }

  constructor(private Request:httpRequests, private router:Router) {
  }
  group=new FormGroup({
    name:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',Validators.required),
    passwordconfirm:new FormControl("",[Validators.required],this.CheckPassword.bind(this)),
    CheckBox:new FormControl('',[Validators.requiredTrue]),
  },[],this.Validate.bind(this));
  password(){
    if(this.group.get("password")?.value==""){
      this.group.get("passwordconfirm")?.disable();
    }else{
      this.group.get("passwordconfirm")?.enable();
    }
  }
  CheckPassword(control:AbstractControl):Promise<any>{
        let password=this.group.value.password;
        let promise=new Promise((resolve,reject)=>{
          if(password!='' && control.value!='' && password!=control.value){
            resolve({PassError:"invalid"});
          }else{
            resolve(null);
          }
        })
    return promise;

  }
  CheckEmail(result:any,email:string):boolean{
    if(email==''){
      return true;
    }
    let ok:boolean=true;
    result.forEach(function (element:any){
      if(element.email==email){
        ok=false;
      }
    })
    return ok;
  }

  Validate(control:AbstractControl):Promise<any>|Observable<any>{
     let observable= this.Request.GetAllUsers().pipe(map(data=>{
       console.log(control.value.email);
        if(!this.CheckEmail(data,control.value.email)){
            return({EmailError:"true"});
        }else{
          return null;
        }
    }))
    return observable;
    }


  submit(info:any){
    if(this.group.valid){
      this.Request.AddUser(info).subscribe((response)=>{
        if(response==null){
          this.router.navigate(["/login"]);
        }
      })
    }
  }
}
