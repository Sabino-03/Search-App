import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { switchMap, take, toArray } from "rxjs";
import { ButtonComponent } from "../button-component/button.component";
import { DeleteService } from "../../services/delete.service";
import { NumberOfService } from "../../services/numberOf.service";
import { SearchService } from "../../services/search.service";
import { UserMod } from "../../models/userMod";

@Component({
    selector: 'usersTable-component',
    templateUrl: './usersTable.html',
    styleUrl: './usersTable.css',
    imports: [
        NgFor,
        ButtonComponent
    ]
})

export class UsersTableComponent {

    userArray : UserMod[] = [];

    constructor(
        public deleteService : DeleteService,
        public numberOfService : NumberOfService,
        public searchService : SearchService
    ) { this.deleteItemsToList(); }

    addItemsToList() : UserMod[] {
        this.searchService.userList$
        .pipe(
            switchMap((users : UserMod[]) => users),
            take(this.numberOfService.addNumberOfUsers() + 1),
            toArray()
        )
        .subscribe(
            (list : UserMod[]) => { this.userArray = list; },
            (err) => console.log('error' + err),
            () => console.log('completed')
        )
        return this.userArray;
    }

    subItemsToList() : UserMod[] {
        this.searchService.userList$
        .pipe(
            switchMap((users : UserMod[]) => users),
            take(this.numberOfService.subNumberOfUsers() - 1),
            toArray()
        )
        .subscribe(
            (list : UserMod[]) => { this.userArray = list; },
            (err) => console.log('error' + err),
            () => console.log('completed')
        )
        return this.userArray;
    }

    deleteItemsToList() : UserMod[] {
        this.deleteService.resetCounters();
        this.searchService.userList$
        .pipe(
            switchMap((users : UserMod[]) => users),
            take(0),
            toArray()
        )
        .subscribe(
            (list : UserMod[]) => { this.userArray = list; },
            (err) => console.log('error' + err),
            () => console.log('completed')
        )
        return this.userArray;
    }

    trackByName(index : number, user : UserMod) : string { return user.Nome; }

}
