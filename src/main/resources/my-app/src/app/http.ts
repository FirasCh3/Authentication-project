import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class httpRequests{
    constructor(private http:HttpClient){
    }
    GetAllUsers(){
        return  this.http.get("http://localhost:4000/users");
    }
    Login(info:any){
      return this.http.post("http://localhost:4000/auth",info);
    }
    DeleteUser(id:number){
      return this.http.delete("http://localhost:4000/delete?id="+id);
    }
    AddUser(info:any){
      return this.http.post("http://localhost:4000/adduser",info);
    }
}
