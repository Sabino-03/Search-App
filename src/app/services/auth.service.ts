import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { first, map, switchMap, tap, toArray } from "rxjs/operators";
import { User } from "../models/user";

@Injectable({providedIn: 'root'})
export class AuthService {

    private http = inject(HttpClient);

    isLoggedIn$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    //userLoggedIn$ : BehaviorSubject<string> = new BehaviorSubject<string>('');

    isAuthenticated(username : string, password : string) : BehaviorSubject<boolean> {
        this.isLoggedIn$
        .pipe(
            switchMap(() => {
                return this.http.get<User[]>(`https://jsonplaceholder.typicode.com/users/`)
                .pipe(
                    switchMap((users : User[]) => users),
                    map((user : User) => {
                        return {
                            UserName : user.username,
                            PassWord : user.id.toString()
                        }
                    }),
                    toArray(),
                    map((userList : { UserName : string, PassWord : string}[] ) => {
                        const userFound = userList.find(listOf => listOf.UserName === username);
                        let userToken : boolean = false;
                        if(userFound) {
                            if(userFound.PassWord === password) {
                                console.log('User Logged');
                                localStorage.setItem('token', 'true');
                                userToken = true;
                            }
                            else {
                                localStorage.setItem('token', 'false');
                                throw new Error('Credenziali Errate');
                            }
                        }
                        else {
                            localStorage.setItem('token', 'false');
                            throw new Error('Credenziali Errate');
                        }
                        return userToken;
                    })
                )
            }),
            tap((userToken : boolean) => this.isLoggedIn$.next(userToken)),
            first() //COMPLETAMENTO
        )
        .subscribe(
            (userToken : boolean) => { console.log('User Token : ' + userToken) },
            (err) => console.log('error' + err),
            () => console.log('completed AuthService')
        )
        return this.isLoggedIn$;
    }

    getToken() : boolean { return this.isLoggedIn$.getValue(); /*return localStorage.getItem('token');*/ }

    removeToken() : boolean {
        this.isLoggedIn$.next(false);
        console.log('User NON Connesso : ' + false);
        localStorage.removeItem('token');
        return this.isLoggedIn$.getValue();
    }

}
