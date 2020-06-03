import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {catchError} from "rxjs/operators"
import { throwError } from 'rxjs';


interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({ providedIn: 'root' })
export class signupService {
    constructor(private http: HttpClient) {
    }

    signup(firstName: string, lastName: string, email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCnglNa8n8EE-rC6M0yIpQlKnstvVmDLc",
            {
                firstName,
                lastName,
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(catchError(errorRes => {
            let errorMessage = "An unknown error occured";
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage)
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                  errorMessage = "This email exists already";
                break;
            }
            return throwError(errorMessage)
        }))
        
    }
}





