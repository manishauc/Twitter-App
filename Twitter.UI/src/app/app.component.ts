import { Component,OnInit } from '@angular/core';
import { HomeService } from './components/home/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  constructor(public homeService:HomeService){

  }

  ngOnInit(): void {
    this.homeService.getRequest("../assets/data/env.json").subscribe((response:env)=>{
      window.sessionStorage.setItem('baseURL',response.baseUrl)

    })

  }

  title = 'AngIntro';
  comments: { username: string, text: string }[] = [];

}

interface env{
  baseUrl:string;
  isProduction:boolean;
}
