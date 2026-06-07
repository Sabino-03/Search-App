import { DOCUMENT } from "@angular/common";
import { Component, EventEmitter, Inject, Output } from "@angular/core";
import { BehaviorSubject, fromEvent, Observable, of } from "rxjs";
import { catchError, debounceTime, map, retry } from 'rxjs/operators';
import { toLowerCase_Replace } from "../../core/rxjs/operators/toLowerCaseAndReplace";

@Component({
    selector: 'navbar-component',
    templateUrl: './navbar.html',
    styleUrl: './navbar.css'
})

export class NavbarComponent {

    @Output() emittedValue = new EventEmitter<string>();
    
    searchTerm$ : BehaviorSubject<string> = new BehaviorSubject('');

    constructor(
        @Inject(DOCUMENT)
        private document : Document,
    ) {}

    input() : string | void {

        const navbar = this.document.getElementById('NavBar');
        if(navbar) {
            fromEvent<KeyboardEvent>(navbar, 'input')
            .pipe(
                map((input : KeyboardEvent) => (input.currentTarget as HTMLInputElement).value),
                //toLowerCase_Replace(),
                debounceTime(1000),
            )
            .subscribe(
                (value) => {
                    this.searchTerm$.next(value);

                    this.emittedValue.emit(this.searchTerm$.getValue());
                },
                (err) => console.log('error' + err),
                () => console.log('completed')
            )
        }

    }
    
}
