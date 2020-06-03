import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { AuthComponent } from './Auth/auth.component';
import { DashboardTableComponent } from './dashboard-table/dashboard-table.component';
import { AuthComponent } from './Auth/auth.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SignupComponent } from './signup/signup.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSortModule} from '@angular/material/sort';

import { AuthGuard } from './Auth/auth.guard'
const appRoutes: Routes = [
  { path: "", component: AuthComponent },
  {
    path: "dashboard",
    component: UserDashboardComponent,
    // canActivate: [AuthGuard],
    // children:[]
    canActivate: [AuthGuard]
  },
  { path: "signup", component: SignupComponent },
]


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardTableComponent,
    ToolbarComponent,
    SignupComponent,
    UserDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSortModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
