import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { UserService } from "../../State/User/user.service";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../Models/AppState";
import { UserInfo } from "os";

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    userProfile: any;
    constructor(
        private userService: UserService,
        private store: Store<AppState>
    ){
        this.userService.getUserProfile()
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        this.store.pipe(select((store) => store.user)).subscribe((user) => {
            this.userProfile = user.userProfile;
        });
        return this.userProfile.role == "ADMIN";
    }

}