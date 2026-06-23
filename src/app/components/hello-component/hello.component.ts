import { Component, input, InputSignal, OnInit } from "@angular/core";

@Component({
    selector: 'hello-component', //TAG HTML CHE RAPPRESENTA IL COMPONENTE
    templateUrl: './hello.html', //STRUTTURA HTML CHE RAPPRESENTA IL COMPONENTE
    styleUrl: './hello.css' //STILE CSS CHE RAPPRESENTA IL COMPONENTE
})

export class HelloComponent implements OnInit {

  userLogged : InputSignal<string> = input(''); //DECORATORE CHE CONSENTE DI FAR PASSARE (DA PARTE DI COMPONENTE PADRE) UN VALORE AL COMPONENTE FIGLIO

  ngOnInit(): void {
    console.log(`Benvenuto ${this.userLogged}`);
  }

}
