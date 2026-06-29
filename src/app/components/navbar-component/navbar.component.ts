import { Component, EventEmitter, input, Input, InputSignal, OnDestroy, OnInit, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';
import { toLowerCase_Replace } from "../../core/rxjs/operators/toLowerCaseAndReplace";
import { validator } from "../../core/rxjs/operators/validator";

@Component({
    selector: 'navbar-component',
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
    imports: [ ReactiveFormsModule ]
})

export class NavBarComponent implements OnInit, OnDestroy {

    @Input() isActivated_nb : boolean = true; //ABILITA/DISABILITA LA NAVBAR
    text_nb : InputSignal<string> = input.required(); //TESTO DELLA NAVBAR
    theme_nb : InputSignal<'dark' | 'light'> = input.required(); //TIPO HTML + TIPO CSS
    @Output() inputTerm : EventEmitter<string> = new EventEmitter<string>();

    inputControl : FormControl<string> = new FormControl();

    destroy$ : Subject<void> = new Subject<void>();

    ngOnInit() : void {
        console.log(`NavBar Initialized : Label:${this.text_nb}, Style:${this.theme_nb}`);

        this.inputControl.valueChanges
        .pipe(
            map((inputTerm : string) => inputTerm),
            debounceTime(1000),
            toLowerCase_Replace(),
            distinctUntilChanged(),
            validator(),
            takeUntil(this.destroy$) //ATTIVAZIONE : EMISSIONE DI VALORE DA PARTE DI destroy$, takeUntil EFFETTUA subscribe SILENZIOSA
        )
        .subscribe(
            (value : string) => { this.inputTerm.emit(value); },
            (err) => console.log('error' + err),
            () => console.log('completed')
        )
    }

    ngOnDestroy() : void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    enableButton() : void { this.isActivated_nb = true; } //ABILITA

    disableButton() : void { this.isActivated_nb = false; } //DISABILITA

}
