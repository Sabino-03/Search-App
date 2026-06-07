import { Component, Input } from "@angular/core";
import { ButtonComponent } from "../button-component/button.component";
import { NavbarComponent } from "../navbar-component/navbar.component";

@Component({
    selector: 'HomePage-component',
    templateUrl: './HomePage.html',
    styleUrls: [
        '../button-component/button.css',
        '../navbar-component/navbar.css'
    ],
    imports: [
        ButtonComponent,
        NavbarComponent
    ]
})

export class HomePageComponent {

    @Input() searchTerm : string = '';

    constructor() {}

}
