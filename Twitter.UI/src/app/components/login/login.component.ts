import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  baseURL:string ;
  ngOnInit(): void {
   this.baseURL = window.sessionStorage.getItem('baseURL')
   this.success = window.sessionStorage.getItem('success')
   sessionStorage.removeItem('success')
 }


loginForm: FormGroup;
error:string = null;
success:string =null;
errorMsg:string=null;
constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
  this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
}

login(): void {
  if (this.loginForm.invalid) {
    // Perform actions if the form is invalid (e.g., display error messages)
    return;
  }

  // Form is valid, proceed with the login process
  const email = this.loginForm.value.email;
  const password = this.loginForm.value.password;

  // Your API URL for the login endpoint
  const apiUrl = `${this.baseURL}api/auth/login`;

  // Create the request body
  const requestBody = {
    email: email,
    password: password
  };

  // Set the headers (if required by your API)
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'accept': '*/*'
  });

  // Make the HTTP POST request
  this.http.post(apiUrl, requestBody, { headers: headers }).subscribe(
    (response: any) => {
      console.log('Login successful!', response);
      window.sessionStorage.setItem('id',response.id)
      window.sessionStorage.setItem('token',response.token)
      
      this.router.navigate(['/home']);
    },
    (error: any) => {
      // Handle errors if the login fails
      this.errorMsg = error.error.message;
      console.error('Login failed!', error);
      // Perform any other error handling actions
    }
  );
}

openRegister(): void {
  this.router.navigate(['/register']);

  // Perform actions for opening the registration page
}
}


