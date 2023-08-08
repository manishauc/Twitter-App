import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,public homeService:HomeService,private http: HttpClient ) {
  //  console.log(window.sessionStorage);

  }
  error:string = null;
  success:string =null;
  errorMsg:string=null;
  searchQuery: string;
  showSearchHint: boolean = false;

  userProfilePhoto = 'assets/profile.jpg';
  tweetMessage = '';
  tweets: Tweet[] = [];
  baseURL:string ;
  userid:string ;
  username:string = "Test User";
  showComment= false;
  showCommentid:string;
 

  ngOnInit(): void {
    this.baseURL = window.sessionStorage.getItem('baseURL')
    this.userid = window.sessionStorage.getItem("id")

    if(this.userid){
      this.getFeeds()
      this.getUsername()
    }else{
      this.router.navigate(['/'])
    }
  }


  //START :: GET FEEDS DATA
  getFeeds(){
    let userId = window.sessionStorage.getItem("id")
    const apiUrl = `${this.baseURL}api/auth/userAndFollowedTweets/${userId}`;
    // Make the HTTP POST request
    this.homeService.getRequest(apiUrl).subscribe(
      (response:Tweet[]) => {
        console.log('Get User and his followings Tweet List: successful!', response);
        this.tweets = response;
      },
      (error: any) => {
         this.errorMsg = error.error.message;
        // Handle errors if the login fails
        console.error('Get User and his followings Tweet List:  failed!', error);
      }
    );
  }
  
   //END :: GET FEEDS DATA

    //START :: GET USER NAME
    getUsername(){
      let apiURL = `${this.baseURL}api/auth/profile/${this.userid}`
      return this.homeService.getRequest(apiURL).subscribe((res:any)=>{
        if(res){  
          this.username = res.name
        }
      },
      (error)=>{
        console.log(error);
      })
    }
    //END :: GET USER NAME

  toggleSearchHint(): void {
    this.showSearchHint = !this.showSearchHint;
  }

  //START:: POST THE TWEET
  postTweet() {
      
    if (this.tweetMessage) {
        
        
        const requestBody = {
            content : this.tweetMessage,

        };
        this.tweetMessage = ''; 
        // Call the API
        const apiUrl = `${this.baseURL}api/auth/users/${this.userid}/tweets`;
      //N  this.homeService.postRequest(apiUrl,requestBody);
        // Set the headers (if required by your API)
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': '*/*'
      });

      this.http.post(apiUrl, requestBody, { headers: headers }).subscribe(
        (response: any) => {
          const newTweet: Tweet = {...new Tweet(),
                id:response.id,
                content: this.tweetMessage,
                username:this.username,
                //image: 'https://images.unsplash.com/your-image-url',
                likes: 0,
               comments: [],
               retweets:0,
            }
            console.log('Tweet successful!', response);
            this.tweets.unshift(newTweet);
        },
        (error: any) => {
            // Handle errors if the register fails
            this.errorMsg = error.error.message;   
            console.error('tweet failed!', error);   
            
        }
      );
    }

  }
  //END  :: POST THE TWEET


  //START :: LIKE THE TWEET
  likePost(tweet: any) {
    alert(tweet.id);
      let tweetId = tweet.id;
      const requestBody = {
         
      };
      // Set the headers (if required by your API)
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': '*/*'
      });

    const apiUrl = `${this.baseURL}api/auth/likes/${tweetId}/${this.userid}`;
    //this.homeService.postRequest(apiUrl,requestBody); 
    this.http.post(apiUrl, requestBody, { headers: headers }).subscribe(
        (response: any) => {

            console.log('Like dislike successful!', response);
            if(response.liked==true){
               tweet.likes++;
             }else if(response.liked==false){
               tweet.likes--;
             }
        },
        (error: any) => {
            // Handle errors if the register fails
            this.errorMsg = error.error.message;   
            console.error('Like action failed!', error);   
            
        }
      );

  }
  //END :: LIKE THE TWEET


  //START :: RETWEET  AN OTHER PERSON"S  TWEET
  RetweetPost(tweet :any){

      let tweetId = tweet.id;
      const requestBody = {};
        // Set the headers (if required by your API)
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'accept': '*/*'
      });

      const apiUrl = `${this.baseURL}api/auth/retweet/${tweetId}/${this.userid}`;
      //this.homeService.postRequest(apiUrl,requestBody); 
      this.http.post(apiUrl, requestBody, { headers: headers }).subscribe(
        (response: any) => {
            console.log('Retweet successful!', response);
            tweet.retweets++;
        },
        (error: any) => {
            // Handle errors if the register fails
            console.error('Retweet action failed!', error);    
            this.errorMsg = error.error.message;  
        }
      );
  }
  //END :: RETWEET  AN OTHER PERSON"S  TWEET

  //START :: COMMENT ON TWEET
  promptComment(tweet: any) {
    const comment = prompt('Enter your comment:');
    if(comment){
        let tweetId = tweet.id;
        const requestBody = {
          commentMsg : comment
        };
        // Call the API
        const apiUrl = `${this.baseURL}api/auth/tweets/${tweetId}/${this.userid}/comments`;
        this.homeService.postRequest(apiUrl,requestBody);
    }
    tweet.comments.push(comment);
  }
   //END :: COMMENT ON TWEET
  

    toggleComment(getid){

      if(!this.showComment){
          this.showComment = !this.showComment
          this.showCommentid = getid;
          return
      }
      if(this.showCommentid !=null && getid != null && this.showCommentid != getid){
          this.showCommentid = getid
          return
      }

      this.showComment = !this.showComment
      this.showCommentid = getid;
    }
}

// interface Tweet {
//   username: string;
//   handle: string;
//   message: string;
//   image: string;
//   likes: number;
//   comments: string[];
// }

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





