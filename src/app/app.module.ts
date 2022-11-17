import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { NotificationComponent } from './notification/notification.component';
import { CardsComponent } from './products/cards/cards.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReviewComponent } from './products/review/review.component';
import { SearchFilterComponent } from './products/filter/search-filter/search-filter.component';
import { CreateFormComponent } from './products/create-form/create-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './authentication/register/register.component';
import { MultipleSelecterComponent } from './products/filter/multiple-selecter/multiple-selecter.component';
import {UserService} from "./authentication/user.service";
import { DetailsComponent } from './products/details/details.component';
import { SellersComponent } from './products/sellers/sellers.component';
import { EditFormComponent } from './products/edit-form/edit-form.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'review', component: ReviewComponent},
  {path: 'sellers', component: SellersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'sellers/create', component: CreateFormComponent},
  {
    path: "sellers/:id",
    pathMatch: "full",
    component: DetailsComponent,
  },
  {
    path: "sellers/edit/:id",
    pathMatch: "full",
    component: EditFormComponent,
  },
]



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    NotificationComponent,
    CardsComponent,
    ReviewComponent,
    SearchFilterComponent,
    CreateFormComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MultipleSelecterComponent,
    DetailsComponent,
    SellersComponent,
    EditFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],

  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

