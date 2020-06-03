import { Component, OnInit } from '@angular/core';
import {loginService} from "./Auth/auth.service"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'stanbic-project';
  constructor(private loginService : loginService){}

  ngOnInit(){
    this.loginService.autoLogin();
  }
}
