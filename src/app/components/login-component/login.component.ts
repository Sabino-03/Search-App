import { DOCUMENT } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, fromEvent } from "rxjs";
import { debounceTime, map, tap } from "rxjs/operators";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'login-component',
    templateUrl: './login.html',
    styleUrls: [
        '../button-component/button.css',
        './login.css',
        '../navbar-component/navbar.css'
    ]
})

export class LoginComponent {

    usernameTerm$ : BehaviorSubject<string> = new BehaviorSubject('');
    passwordTerm$ : BehaviorSubject<string> = new BehaviorSubject('');

    constructor(
        @Inject(DOCUMENT)
        private document : Document,
        private router : Router,
        private authService : AuthService
    ) {}

    getUserName() : BehaviorSubject<string> {
        const usernameNavBar = this.document.getElementById('username-text-box');
        if(usernameNavBar) {
            fromEvent<KeyboardEvent>(usernameNavBar, 'input')
            .pipe(
                map((input : KeyboardEvent) => (input.currentTarget as HTMLInputElement).value.toString()),
                //toLowerCase_Replace(),
                debounceTime(1000),
                tap((value : string) => console.log('USERNAME : ' + value))
            )
            .subscribe(
                (value : string) => { this.usernameTerm$.next(value); },
                (err) => console.log('error' + err),
                () => console.log('completed')
            )
        }
        return this.usernameTerm$;
    }

    getPassWord() : BehaviorSubject<string> {
        const passwordNavBar = this.document.getElementById('password-text-box');
        if(passwordNavBar) {
            fromEvent<KeyboardEvent>(passwordNavBar, 'input')
            .pipe(
                map((input : KeyboardEvent) => (input.currentTarget as HTMLInputElement).value.toString()),
                //toLowerCase_Replace(),
                debounceTime(1000),
                tap((value : string) => console.log('PASSWORD : ' + value))
            )
            .subscribe(
                (value : string) => { this.passwordTerm$.next(value); },
                (err) => console.log('error' + err),
                () => console.log('completed')
            )
        }
        return this.passwordTerm$;
    }

    logIn() : void {
        this.authService.isAuthenticated(this.usernameTerm$.getValue(), this.passwordTerm$.getValue())
        .pipe(
            //skip(1), //SI UTILIZZA skip(1) PERCHÈ isLogged$ NON RISULTA AGGIORNATO => DA ULTIME OPERAZIONI
            tap((token : boolean) => token ? this.router.navigate(['home']) : this.router.navigate(['']))
        )
        .subscribe(
            (userToken : boolean) => {},
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
