import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { first, map, switchMap, skip, tap, toArray } from "rxjs/operators";
import { User } from "../models/user";

@Injectable({providedIn: 'root'})
export class AuthService {

    isLoggedIn$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    //userLoggedIn$ : BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor( private http : HttpClient ) {}

    isAuthenticated(username : string, password : string) : BehaviorSubject<boolean> {

        this.isLoggedIn$
        .pipe(
            tap(() => {
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
                    map((userList : { UserName : string, PassWord : string }[]) => {

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
                .subscribe(
                    (userToken : boolean) => { return this.isLoggedIn$.next(userToken); },
                    (err) => console.log('error' + err),
                    () => console.log('')
                )
            }),
            skip(1), //SI UTILIZZA skip(1) PERCHÈ isLogged$ NON RISULTA AGGIORNATO => DA ULTIME OPERAZIONI
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
        localStorage.removeItem('token');
        return this.isLoggedIn$.getValue();

    }

}
