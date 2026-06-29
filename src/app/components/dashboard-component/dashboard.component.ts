import { Component, inject } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { ButtonComponent } from "../button-component/button.component";
import { HelloComponent } from "../hello-component/hello.component";
import { NavBarComponent } from "../navbar-component/navbar.component";
import { AuthService } from "../../services/auth.service";
/*import { DeleteService } from "../../services/delete.service";*/
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

    private router = inject(Router);
    private authService = inject(AuthService);
    /*public deleteService = inject(DeleteService);*/
    public numberOfService = inject(NumberOfService);
    public searchService = inject(SearchService);
    public userLoggedService = inject(UserLoggedService);

    userLogged : string = this.userLoggedService.getUserLogged();
    searchTerm : string = '';

    onClickLogOut() : void {
        const removedToken = this.authService.removeToken();
        removedToken ? {} : this.router.navigate(['']);
    }

    onSubmit() : void {
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
