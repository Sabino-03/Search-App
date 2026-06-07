import { JsonPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { HelloComponent } from './components/hello-component/hello.component';
import { LoginComponent } from './components/login-component/login.component';
import { NavbarComponent } from './components/navbar-component/navbar.component';
import { ClearNavBar } from './services/clear.service';
import { NumberOf } from './services/numberOf.service';
import { SearchPosts } from './services/posts.service';
import { SearchService } from './services/search.service';
import { SearchUsers } from './services/users.service';

@Component({
  selector: 'app-root',
  imports: [
    JsonPipe,
    NgIf,
    RouterOutlet,
    HelloComponent,
    LoginComponent,
    NavbarComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})

export class AppComponent {

  //protected readonly title = signal('search-app');

  constructor( private router : Router ) {

    router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event : NavigationEnd) => {})
    )
    .subscribe(
      (value) => {
        console.log('Changed Route' + value);
      },
      (err) => console.log('error' + err),
      () => console.log('completed')
    )
    
  }
  
}
