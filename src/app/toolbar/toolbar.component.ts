import { Component, OnInit, OnDestroy } from '@angular/core';
import {loginService} from "../Auth/auth.service";
import { HttpClient } from "@angular/common/http";
import {Router} from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent  implements OnInit , OnDestroy {
  private userSub: Subscription
isAuthenticated = false;
  constructor(private loginService: loginService) {
    
   }

  ngOnInit(): void {
   this.userSub = this.loginService.user.subscribe(user=>{
    this.isAuthenticated = !user? false : true
   });
  }
  logoutHandler(){
    this.loginService.signout();
    console.log("works");
    // this.isAuthenticated = this.authenticated;
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
