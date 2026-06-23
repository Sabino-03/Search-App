import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})

export class AppComponent {

  constructor( private router : Router ) {
    this.router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event : NavigationEnd) => event)
    )
    .subscribe(
      (value) => { console.log('Changed Route' + value); },
      (err) => console.log('error' + err),
      () => console.log('completed')
    )
  }

}
