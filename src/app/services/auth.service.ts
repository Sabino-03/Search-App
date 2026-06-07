import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { map, switchMap, tap, toArray } from "rxjs/operators";
import { User } from "../models/user";

@Injectable({providedIn: 'root'})
export class AuthService {

    isLoggedIn$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    //userLoggedIn$ : BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor(
        private router : Router,
        private http : HttpClient
    ) {}

    isAuthenticated(username : string, password : string) : boolean {
        
        this.http.get<User[]>(`https://jsonplaceholder.typicode.com/users/`)
        .pipe(
            switchMap((users : User[]) => users),
            map((user : User) => {
                return {
                    UserName : user.username,
                    PassWord : user.id.toString()
                }
            }),
            toArray(),
            tap((userList : { UserName : string, PassWord : string }[]) => {

                if(userList.find(listOf => listOf.UserName === username)) {

                    const userIndex = userList.findIndex(listOf => listOf.UserName === username);

                    if(userList[userIndex].PassWord === password) {

                        this.isLoggedIn$.next(true);
                        localStorage.setItem('token', 'true');

                    }

                    else {

                        this.isLoggedIn$.next(false);
                        localStorage.setItem('token', 'false');
                        throw new Error('Credenziali Errate');

                    }

                }

                else {

                    this.isLoggedIn$.next(false);
                    localStorage.setItem('token', 'false');
                    throw new Error('Credenziali Errate');

                }

            })
        )

        return this.isLoggedIn$.getValue();

    }

    getToken() : boolean { return this.isLoggedIn$.getValue(); /*return localStorage.getItem('token');*/ }

    removeToken() : boolean {

        this.isLoggedIn$.next(false);
        localStorage.removeItem('token');
        return this.isLoggedIn$.getValue();

    }

}
