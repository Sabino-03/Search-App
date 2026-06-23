import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login.component';
import { DashBoardComponent } from './components/dashboard-component/dashboard.component';
import { UsersTableComponent } from './components/usersTable-component/usersTable.component';
import { PostsTableComponent } from './components/postsTable-component/postsTable.component';
import { AuthGuard } from './services/authGuard.service';

export const routes : Routes = [
    {
      path: '',
      component: LoginComponent
    },
    {
      path: 'home',
      component: DashBoardComponent,
      canActivate: [ AuthGuard ],
      children: [
        //{ path: '', component: LoadingComponent },
        { path: 'users', component: UsersTableComponent },
        { path: 'posts', component: PostsTableComponent }
      ]
    },
    //{path: 'search', component: AppComponent},
    //{path: '**', component: ErrorComponent}
];

@NgModule({
  bootstrap: [],
  declarations: [],
  /*exports: [ RouterModule ],*/
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ AuthGuard ]
})

export class AppModule {}
