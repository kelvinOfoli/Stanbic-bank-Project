import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { loginService } from "./auth.service"
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoading = false;
  error: String = null;
  loginError: String = null;

  constructor(private loginService: loginService,private router: Router) { }

  ngOnInit(): void { }

  loginHandler(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    this.loginService.signin(email, password).subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(["/dashboard"])
      },
      errorRes => {
        this.error = "Error occured"
        switch (errorRes.error.error.message) {
          case 'INVALID_PASSWORD':
            this.loginError = "Invalid Passward";
            break;
          case 'EMAIL_NOT_FOUND':
            this.loginError = "This account does not exist";
            break;

        }
        this.isLoading = false;
      }

    )
    form.reset()

  }
}
