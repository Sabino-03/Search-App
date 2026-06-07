import { Component, Input } from "@angular/core";

@Component({
    selector: 'hello-component', //TAG HTML CHE RAPPRESENTA IL COMPONENTE
    templateUrl: './hello.html', //STRUTTURA HTML CHE RAPPRESENTA IL COMPONENTE
    styleUrl: './hello.css' //STILE CSS CHE RAPPRESENTA IL COMPONENTE
})

export class HelloComponent {

  @Input() user : string = '';
  //DECORATORE CHE CONSENTE DI FAR PASSARE (DA PARTE DI COMPONENTE PADRE) UN VALORE AL COMPONENTE FIGLIO

  constructor() {}
  
}
