import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { debounceTime, filter, map, takeUntil, tap } from "rxjs/operators";
import { AuthService } from "../../services/auth.service";
import { UserLoggedService } from "../../services/userLogged.service";

@Component({
    selector: 'login-component',
    templateUrl: './login.html',
    styleUrls: [
        '../button-component/button.css',
        './login.css',
        '../navbar-component/navbar.css'
    ],
    imports: [ ReactiveFormsModule ]
})

export class LoginComponent implements OnInit, OnDestroy {

    private router = inject(Router);
    private authService = inject(AuthService);
    private userLoggedService = inject(UserLoggedService);

    loginForm = new FormGroup({
        username : new FormControl<string>(''),
        password : new FormControl<string>('')
    });
    destroy$ : Subject<void> = new Subject<void>();
    usernameTerm$ : BehaviorSubject<string> = new BehaviorSubject<string>('');
    passwordTerm$ : BehaviorSubject<string> = new BehaviorSubject<string>('');

    ngOnInit() : void {
        this.getUserName();
        this.getPassWord();
    }

    ngOnDestroy() : void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getUserName() : void {
        this.loginForm.get('username')?.valueChanges
        .pipe(
            map((inputTerm : string | null) => inputTerm ? inputTerm : ''),
            filter((usernameTerm : string) => usernameTerm.length > 3),
            debounceTime(1000),
            tap((usernameTerm : string) => console.log('USERNAME : ' + usernameTerm)),
            takeUntil(this.destroy$) //ATTIVAZIONE : EMISSIONE DI VALORE DA PARTE DI destroy$, takeUntil EFFETTUA subscribe SILENZIOSA
        )
        .subscribe(
            (usernameTerm : string) => { this.usernameTerm$.next(usernameTerm); },
            (err) => { throw new Error('error' + err) },
            () => console.log('getUserName() completed')
        )
    }

    getPassWord() : void {
        this.loginForm.get('password')?.valueChanges
        .pipe(
            map((inputTerm : string | null) => inputTerm ? inputTerm : ''),
            filter((passwordTerm : string) => passwordTerm.length > 0),
            debounceTime(1000),
            tap((passwordTerm : string) => console.log('USERNAME : ' + passwordTerm)),
            takeUntil(this.destroy$) //ATTIVAZIONE : EMISSIONE DI VALORE DA PARTE DI destroy$, takeUntil EFFETTUA subscribe SILENZIOSA
        )
        .subscribe(
            (passwordTerm : string) => { this.passwordTerm$.next(passwordTerm); },
            (err) => { throw new Error('error' + err) },
            () => console.log('getUserName() completed')
        )
    }

    onSubmit() : void {
        this.authService.isAuthenticated(this.usernameTerm$.getValue(), this.passwordTerm$.getValue())
        .pipe(
            tap((token : boolean) => token ? this.router.navigate(['home']) : false),
            takeUntil(this.destroy$) //ATTIVAZIONE : EMISSIONE DI VALORE DA PARTE DI destroy$, takeUntil EFFETTUA subscribe SILENZIOSA
        )
        .subscribe(
            (userToken : boolean) => { this.userLoggedService.setUserLogged(this.usernameTerm$.getValue()); },
            (err) => console.log('error' + err),
            () => console.log('completed LogIn-Component')
        )
    }

    logOut() : boolean { return this.authService.removeToken(); }

}

/*
## 5.0
AUTHENTICATION & SECURITY

CIASCUNA APPLICAZIONE-SINGLE-PAGE NECESSITA DI UN **PROCESSO DI AUTENTICAZIONE**

ROUTER (COMUNICA CON) :
- VIEW 1 (LOGIN); PAGINA DI ACCESSO
- VIEW 2 (ROUTE, IN ANGULAR CHIAMATE FEATURES) ; ALTRE PAGINE
	- FUNZIONALITÀ DELLA APPLICAZIONE PROTETTA DA LOGIN

IN FASE DI LOGIN SI EFFETTUA UNA CHIAMATA AL BE; SI EFFETTUA UNA RICHIESTA AD UNA API `/api/login` :
- EFFETTUATA DA UN COMPONENTE;
- EFFETTUATA DA UN SERVIZIO, UNA CLASSE CHE SI INTERESSA DEI METODI LOGIN E LOGOUT E CHE EFFETTUA MATERIALMENTE LE CHIAMATE AL BE;

IN TALE SERVIZIO SI VA A MEMORIZZARE LA RISPOSTA PER IL LOGIN, ESEMPIO :
- IN UN OGGETTO TIPIZZATO CHE CONTIENE IL TOKEN DI ACCESSO, IL RUOLO, ...
- IN UN OBSERVABLE :
	- SI POSSONO SOTTOSCRIVERE I CAMBIAMENTI, PER FAR REAGIRE L'APPLICAZIONE DI CONSEGUENZA;
		- IN FASE DI LOGIN OBSERVABLE POPOLATO DI INFORMAZIONI RELATIVE A USER; LOGIN EFFETTUATO;
		- IN FASE DI LOGIN OBSERVABLE null ; LOGIN NON EFFETTUATO;

PERMETTE DI DEFINIRE UNA PROTEZIONE LATO-SERVER.

POSTO TRA *ROUTER* E TRA *VIEW 2* INTRODUCO *ROUTER GUARD* : POSSIBILITÀ DI PROTEGGERE UNA VIEW MEDIANTE UNA CLASSE,
LA QUALE VERIFICA SE LO USER PUÒ AVERE ACCESSO O MENO;
ESSO RESTITUISCE UN boolean O UN Observable<boolean>
- true : ACCESSO CONSENTITO
- false : ACCESSO NEGATO

ESSA VIENE CONFIGURATA MEDIANTE UNA OPZIONE CanActivate (PRESENTE NELLE REGOLE DEL ROUTER)
CHE VERIFICA IL CONTENUTO DELL'OGGETTO/DELL'OBSERVABLE (TOKEN DI ACCESSO, RUOLO, ... ) CHE RESTITUISCE UN boolean
- true : ACCESSO ALLA VIEW CONSENTITO
- false : ACCESSO ALLA VIEW NEGATO

TALI VIEW NECESSITANO DI EFFETTUARE DELLE CHIAMATE AL SERVER;
RISULTA NECESSARIO PROTEGGERE L'APPLICAZIONE DA ACCESSO A DATI INDESIDERATI;
QUINDI, PER OGNI CHIAMATA, SI PASSA IL TOKEN OTTENUTO IN FASE DI LOGIN.
RISULTA UNA OPERAZIONE RIDONDANTE.

POSTO TRA *VIEW 2* E TRA *BE* INTRODUCO *HTTP INTERCEPTOR* :
POSSIBILITÀ DI INTERCETTARE TUTTE LE CHIAMATE,
CONSENTENDO DI MODIFICARE IL RISULTATO DELLA CHIAMATA PRIMA DI CONSEGNARE IL RISULTATO
(MODIFICA EFFETTUATA PRIMA CHE EFFETTUI LA CHIAMATA AL SERVER) .

*HTTP INTERCEPTOR* GESTISCE GLOBALMENTE GLI ERRORI :
- 401 : TOKEN SCADUTO;
- 404 : SERVER DOWN;

*DIRECTIVES* GESTISCE LA FASE DI VISUALIZZAZIONE DEI COMPONENTI, IN BASE ALLA FASE DI LOGIN, IN BASE AL TOKEN, ...
*/
