import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoggedInAuthGuard, SaveEditedWorkGuard } from '@find-a-buddy/auth-ui';
import { EntityUIModule } from '@find-a-buddy/entity-ui';
import { UtilUIModule } from '@find-a-buddy/util-ui';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealDetailComponent } from './meal-detail/meal-detail.component';
import { MealEditComponent } from './meal-edit/meal-edit.component';
import { MealGridComponent } from './meal-grid/meal-grid.component';
import { MealCardComponent } from './meal-card/meal-card.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MealListComponent,
  },
  {
    path: 'new',
    pathMatch: 'full',
    canActivate: [LoggedInAuthGuard],
    canDeactivate: [SaveEditedWorkGuard],
    component: MealEditComponent,
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: MealDetailComponent,
  },
  {
    path: ':id/edit',
    pathMatch: 'full',
    canActivate: [LoggedInAuthGuard],
    canDeactivate: [SaveEditedWorkGuard],
    component: MealEditComponent,
  },
];

@NgModule({
  declarations: [
    MealListComponent,
    MealDetailComponent,
    MealEditComponent,
    MealGridComponent,
    MealCardComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes),
    UtilUIModule,
    EntityUIModule,
  ],
  exports: [MealGridComponent, MealCardComponent],
})
export class MealModule {}
