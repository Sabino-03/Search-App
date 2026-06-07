import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/HomePageComponent/HomePage.component';
import { LoginPageComponent } from './components/LoginPageComponent/LoginPage.component';
import { AuthGuard } from './services/authGuard.service';

export const routes : Routes = [
    {
      path: '',
      component: LoginPageComponent
    },
    {
      path: 'home',
      component: HomePageComponent,
      canActivate: [AuthGuard],
      children: [
        {}
      ]
    },
    //{path: 'search', component: AppComponent},
    //{path: '**', component: ErrorComponent}
];

@NgModule({
  bootstrap: [/*AppComponent*/],
  declarations: [],
  /*exports: [RouterModule],*/
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthGuard
  ]
})

export class AppModule {}
