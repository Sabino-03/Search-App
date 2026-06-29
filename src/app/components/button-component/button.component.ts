import { Component, EventEmitter, Input, input, InputSignal, OnInit, Output } from "@angular/core";

@Component({
    selector: 'button-component',
    templateUrl: './button.html',
    styleUrl: './button.css'
})

export class ButtonComponent implements OnInit {

  @Input() isActivated_btn : boolean = true; //ABILITA/DISABILITA IL BUTTON
  label_btn : InputSignal<string> = input.required(); //TESTO DEL BUTTON
  size_btn : InputSignal<'small' | 'medium' | 'large'> = input.required(); //DIMENSIONE DEL BUTTON
  type_btn : InputSignal<'button' | 'reset'> = input.required(); //TIPO HTML
  variant_btn : InputSignal<'log' | 'searchTerm' | 'operations' | 'deleteTerm'> = input.required(); //STILE CSS
  @Output() onClick : EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() : void { console.log(`Button Initialized : Label:${this.label_btn}, Style:${this.size_btn}, ${this.variant_btn}`); }

  enableButton() : void { this.isActivated_btn = true; } //ABILITA

  disableButton() : void { this.isActivated_btn = false; } //DISABILITA

  handleClick() : void { //GESTIONE
    if(this.isActivated_btn === true)
      this.onClick.emit();
  }

}
