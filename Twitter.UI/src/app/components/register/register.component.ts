import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  baseURL:string ;
  ngOnInit(): void {
   this.baseURL = window.sessionStorage.getItem('baseURL')

 }


registerForm: FormGroup;
error:string = null;
success:string =null;
errorMsg:string=null;

constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
  this.registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmpassword: ['', Validators.required]
  });
}

register(): void {
  if (this.registerForm.invalid) {
    // Perform actions if the form is invalid (e.g., display error messages)
    return;
  }

  // Form is valid, proceed with the register process
  const name = this.registerForm.value.name;
  const email = this.registerForm.value.email;
  const password = this.registerForm.value.password;
  const confirmpassword = this.registerForm.value.confirmpassword;
  

  if(password !== confirmpassword){
    this.error = "Password not Match"
    return
  }

  // Your API URL for the register endpoint
  const apiUrl = `${this.baseURL}api/auth/register`;

 // const apiUrlGet = `http://localhost:9096/api/auth/profile/1`;

  // Create the request body
  const requestBody = {
    name : name,
    email: email,
    password: password,
    username: "dummyUsername4"
  };

  // Set the headers (if required by your API)
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'accept': '*/*'
  });

  

  // Make the HTTP POST request
  this.http.post(apiUrl, requestBody, { headers: headers }).subscribe(
    (response: any) => {
      this.success =response.registrationMsg;
      // window.sessionStorage.setItem('success',response.registrationMsg);
      console.log('register successful!', response);
      this.router.navigate(['/']);
     //  this.success =response.registrationMsg;
      
    },
    (error: any) => {
    
     
      this.errorMsg = error.error.message;
      // Handle errors if the register fails
      console.error('register failed!', error);
      if(error.status == 200){
        this.router.navigate(['/register']);
      }
      // Perform any other error handling actions
    }
  );



}

openLogin(): void {
  this.router.navigate(['/']);
}

}

interface Tweet {
  username: string;
  handle: string;
  message: string;
  image: string;
  likes: number;
  comments: string[];
}


