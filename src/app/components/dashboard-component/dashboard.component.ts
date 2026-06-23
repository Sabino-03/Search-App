import { Component } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { ButtonComponent } from "../button-component/button.component";
import { HelloComponent } from "../hello-component/hello.component";
import { NavBarComponent } from "../navbar-component/navbar.component";
import { AuthService } from "../../services/auth.service";
import { DeleteService } from "../../services/delete.service";
import { NumberOfService } from "../../services/numberOf.service";
import { SearchService } from "../../services/search.service";
import { UserLoggedService } from "../../services/userLogged.service";

@Component({
    selector: 'dashboard-component',
    templateUrl: './dashboard.html',
    styleUrls: [
        '../button-component/button.css',
        './dashboard.css',
        '../navbar-component/navbar.css'
    ],
    imports: [
        RouterOutlet,
        ButtonComponent,
        HelloComponent,
        NavBarComponent,
    ]
})

export class DashBoardComponent {

    userLogged : string;
    searchTerm : string = '';

    constructor(
        private router : Router,
        private authService : AuthService,
        public deleteService : DeleteService,
        public numberOfService : NumberOfService,
        public searchService : SearchService,
        private userLoggedService : UserLoggedService
    ) { this.userLogged = this.userLoggedService.getUserLogged(); }

    onClickLogOut() : void {
        const removedToken = this.authService.removeToken();
        console.log('User NON Connesso : ' + removedToken);
    }

    onClickSearch() : void {
        this.searchService.onClickSearch(this.searchTerm);
        switch (this.searchTerm) {
        case 'users' : { this.router.navigate(['home/users']); }
            break;

        case 'posts' : { this.router.navigate(['home/posts']); }
            break;

        default :
            throw new Error('Routing NOT Valid');
        }
    }

}
