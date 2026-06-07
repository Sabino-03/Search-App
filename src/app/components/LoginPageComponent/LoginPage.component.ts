import { Component } from "@angular/core";
import { LoginComponent } from "../login-component/login.component";

@Component({
    selector: 'login-page-component',
    templateUrl: '../login-component/login.html',
    styleUrl: '../login-component/login.css',
    imports: [
        LoginComponent
    ]
})

export class LoginPageComponent {}
