import { Component, EventEmitter, input, Input, InputSignal, OnInit, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { toLowerCase_Replace } from "../../core/rxjs/operators/toLowerCaseAndReplace";

@Component({
    selector: 'navbar-component',
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
    imports: [ ReactiveFormsModule ]
})

export class NavBarComponent implements OnInit {

    @Input() isActivated_nb : boolean = true; //ABILITA/DISABILITA LA NAVBAR
    text_nb : InputSignal<string> = input.required(); //TESTO DELLA NAVBAR
    theme_nb : InputSignal<'dark' | 'light'> = input.required(); //TIPO HTML + TIPO CSS
    @Output() inputTerm : EventEmitter<string> = new EventEmitter<string>();

    inputControl : FormControl<string>;

    constructor() {
        
        this.inputControl = new FormControl();

        this.inputControl.valueChanges
        .pipe(
            map((inputTerm : string) => inputTerm),
            debounceTime(1000),
            toLowerCase_Replace(),
            distinctUntilChanged(),
            tap(console.log)
        )
        .subscribe(
            (value : string) => { this.inputTerm.emit(value); },
            (err) => console.log('error' + err),
            () => console.log('completed')
        )

    }

    ngOnInit() : void { console.log(`NavBar Initialized : Label:${this.text_nb}, Style:${this.theme_nb}`); }

    enableButton() : void { this.isActivated_nb = true; } //ABILITA

    disableButton() : void { this.isActivated_nb = false; } //DISABILITA

}
