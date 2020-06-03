import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    // UrlTree,
    Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginService } from './auth.service';
import { map,tap } from 'rxjs/operators/';
import { Subscription } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    private userSub: Subscription

    constructor(private loginService: loginService, private router: Router) {}

    // this.loginService.user.subscribe(user=>{
    canActivate(
        // route: ActivatedRouteSnapshot,
        // router: RouterStateSnapshot
        ): boolean {
        // return this.loginService.user.pipe(map(user => !!user),tap(isAuth=>{
        //     if(!isAuth){
        //         this.router.navigate(["/"]);
        //     }}))
       
            // this.isAuthenticated = !user? false : true
            if(!this.loginService.authenticated()){
                this.router.navigate(["/"]);
                return false;
            }
                return true;
            
        }
    // });
}