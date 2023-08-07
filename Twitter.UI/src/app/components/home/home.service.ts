import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This means the service is available in the root module (app.module.ts).
})
export class HomeService {
  // Your service logic goes here
  constructor(private http:HttpClient){

  }

  getHeader(){
    let userid = window.sessionStorage.getItem('id')
    let token = window.sessionStorage.getItem('token')
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*',
      'Authorization' :`Bearer ${token}`
    });
  }

  postRequest(url,body){
    return this.http.post(url,body,{ headers: this.getHeader() }).subscribe();
  }

  getRequest(url){
    return this.http.get(url,{ headers: this.getHeader() })
  }
}
