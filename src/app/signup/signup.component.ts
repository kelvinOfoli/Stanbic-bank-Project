import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { signupService } from "./signup.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})



export class SignupComponent implements OnInit {
  isLoading = false;
  error: String = null;
  success= false

  constructor(private signupService: signupService,private router: Router) { }
  ngOnInit(): void {
  }



  signupHandler(form: NgForm) {
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const password = form.value.password;



    this.isLoading = true;
    this.signupService.signup(firstName, lastName, email, password).subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
    
          this.success = true;
          setTimeout(()=>{
            this.router.navigate(['/']);
          },5000)
     
      },
      errorMessage => {
        this.error = errorMessage;
        
        this.isLoading = false;
      }

    )
    form.reset()
  }
}

