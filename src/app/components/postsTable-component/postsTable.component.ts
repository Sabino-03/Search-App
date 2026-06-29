import { NgFor } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { switchMap, take, toArray } from "rxjs";
import { ButtonComponent } from "../button-component/button.component";
/*import { DeleteService } from "../../services/delete.service";*/
import { NumberOfService } from "../../services/numberOf.service";
import { SearchService } from "../../services/search.service";
import { PostMod } from "../../models/postMod";

@Component({
    selector: 'postsTable-component',
    templateUrl: './postsTable.html',
    styleUrl: './postsTable.css',
    imports: [
        NgFor,
        ButtonComponent
    ]
})

export class PostsTableComponent implements OnInit {

    /*private deleteService = inject(DeleteService);*/
    private numberOfService = inject(NumberOfService);
    private searchService = inject(SearchService);

    postArray : PostMod[] = [];

    ngOnInit() : void {
        this.deleteItemsToList();
    }

    addItemsToList() : PostMod[] {
        this.searchService.postList$
        .pipe(
            switchMap((posts : PostMod[]) => posts),
            take(this.numberOfService.addNumberOfPosts() + 1),
            toArray()
        )
        .subscribe(
            (list : PostMod[]) => { this.postArray = list; },
            (err) => console.log('error' + err),
            () => console.log('completed')
        )
        return this.postArray;
    }

    subItemsToList() : PostMod[] {
        this.searchService.postList$
        .pipe(
            switchMap((posts : PostMod[]) => posts),
            take(this.numberOfService.subNumberOfPosts() - 1),
            toArray()
        )
        .subscribe(
            (list : PostMod[]) => { this.postArray = list; },
            (err) => console.log('error' + err),
            () => console.log('completed')
        )
        return this.postArray;
    }

    deleteItemsToList() : PostMod[] {
        this.numberOfService.reset();
        this.searchService.postList$
        .pipe(
            switchMap((posts : PostMod[]) => posts),
            take(0),
            toArray()
        )
        .subscribe(
            (list : PostMod[]) => { this.postArray = list; },
            (err) => console.log('error' + err),
            () => console.log('completed')
        )
        return this.postArray;
    }

    trackByTitle(index : number, post : PostMod) : string { return post.Titolo; }

}
