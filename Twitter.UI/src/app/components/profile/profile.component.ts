import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from '../home/home.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  baseURL:string ;
  userData:UserData;
  userid:any;

  userProfilePhoto = 'assets/profile.jpg';
  tweetMessage = '';
  tweets: Tweet[] = [];

 // userid:string ;
  username:string = "Test User";
  showComment= false;
  showCommentid:string;


 
  success:string =null;
  errorMsg:string=null;

  ngOnInit(): void {
    this.baseURL = window.sessionStorage.getItem('baseURL');
    this.userid = window.sessionStorage.getItem("id");
    this.getUserData()
    this.getOwnTweets()
  }

  searchQuery: string;
  showSearchHint: boolean = false;
  enableEdit:boolean = false;

  registerForm: FormGroup;
  error:string = null;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public homeService: HomeService) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      bio: ['', Validators.required],
    });
  }

  //START :: GET FEEDS DATA
  getOwnTweets(){
    let userId = window.sessionStorage.getItem("id")
    const apiUrl = `${this.baseURL}api/auth/profile/${userId}/ListOfOwnTweets`;
    // Make the HTTP POST request
    this.homeService.getRequest(apiUrl).subscribe(
      (response:Tweet[]) => {
        console.log('Get User Tweet List: successful!', response);
        this.tweets = response;
      },
      (error: any) => {
         this.errorMsg = error.error.message;
        // Handle errors if the login fails
        console.error('Get User Tweet List:  failed!', error);
      }
    );

  }
   //END :: GET FEEDS DATA

  updateUserdata(): void {
    if (this.registerForm.invalid) {
      // Perform actions if the form is invalid (e.g., display error messages)
      return;
    }

    // Form is valid, proceed with the register process
    const name = this.registerForm.value.name;
    const bio = this.registerForm.value.bio;

    // Your API URL for the register endpoint
    //const apiUrl = `${this.baseURL}User/${this.userid}`;

    const apiUrl = `${this.baseURL}api/auth/profile/${this.userid}`;

    // Create the request body
    const requestBody = {
      name : name,
      bio : bio,
      profilePicture : "test"
    };

    // Set the headers (if required by your API)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*'
    });

    // Make the HTTP POST request
    this.http.put(apiUrl, requestBody, { headers: headers }).subscribe(
      (response: any) => {
        console.log('Update user data:  successful!', response);
        // this.router.navigate(['/']);
        this.getUserData();
        this.enableEdit = false;
      },
      (error: any) => {
        // Handle errors if the register fails
        console.error('Update user data: failed!', error);
        if(error.status == 200){
          this.router.navigate(['/']);
        }
        // Perform any other error handling actions
      }
    );
  }

  getUserData(){
    let apiURL = `${this.baseURL}api/auth/profile/${this.userid}`
    return this.homeService.getRequest(apiURL).subscribe((res:UserData)=>{
      if(res){
      //  console.log(res);
        //console.log(res.name);
        this.userData = res
         console.log(this.userData);
         //  console.log(res.name);
      
      }
    },
    (error)=>{
      console.log(error);

    })
  }

  updateEdit(val:boolean){
    //alert(val);
 //   alert(this.registerForm.value.name);
    //alert(this.userData.name);
    this.enableEdit = val;
    //this.userData;
    //this.registerForm.value.name = this.userData.name;
  // this.us = this.userData.name;
  //  this.userData.bio;
    // $("userName").val(this.userData.name);
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

interface UserData{
  Id: number;
  bio: string;
  email: String;
  followersCount:number;
  following:number;
  name: string;
  ProfilePicture: String;
  Tweets: []
}

class Tweet {
  id: number;
  content: string;
  timestamp: string;
  username:string;
  likes: number;
  comments : string[];
  video : string;
  image:string;
  retweets:number;

}

