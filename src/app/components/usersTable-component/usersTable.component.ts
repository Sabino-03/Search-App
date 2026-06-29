import { NgFor } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { switchMap, take, toArray } from "rxjs";
import { ButtonComponent } from "../button-component/button.component";
/*import { DeleteService } from "../../services/delete.service";*/
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

export class UsersTableComponent implements OnInit {

    /*private deleteService = inject(DeleteService);*/
    private numberOfService = inject(NumberOfService);
    private searchService = inject(SearchService);

    userArray : UserMod[] = [];

    ngOnInit() : void {
        this.deleteItemsToList();
    }

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
        this.numberOfService.reset();
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
