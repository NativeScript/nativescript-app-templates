import { Routes } from '@angular/router';
import { PeopleComponent } from './people/person.component';
import { PersonDetailComponent } from './people/person-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: 'items', component: PeopleComponent },
  { path: 'item/:id', component: PersonDetailComponent },
];
