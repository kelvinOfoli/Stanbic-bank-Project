import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import {Router} from "@angular/router";
import { throwError, Subject } from "rxjs";
import { User } from "./auth.module";
// import {ToolbarComponent} from "../toolbar/toolbar.component"
export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class loginService {
    public authenticated(): boolean {
        return localStorage.getItem('userData')? true:false;
      }
    user = new Subject<User>()
    private tokenExpirationTimer : any;

    constructor(public http: HttpClient,public router: Router) {}

    private handleAuthentication(
        email: string,
        token: string,
        userId: string ,
        expiresIn:number
        ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email,
            userId,
            token,
            expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem("userData",JSON.stringify(user));
    }

    signin(email: string, password: string) {
        return this.http
            .post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCnglNa8n8EE-rC6M0yIpQlKnstvVmDLc",
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            ).pipe(tap(resData=>{
                this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn)
            }))
    }


    autoLogin(){
        const userData: {
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );
        
        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }

    }

    signout(){
        this.user.next(null);
        this.router.navigate(["/"]);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration : number){
       this.tokenExpirationTimer= setTimeout(()=>{this.signout();},expirationDuration);
    }

}





