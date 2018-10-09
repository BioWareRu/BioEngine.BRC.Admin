import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TagsListComponent} from './tags/list.component';
import {PagesListComponent} from './pages/list.component';
import {PageFormComponent} from './pages/form.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'tags',
      component: TagsListComponent,
    },
    {
      path: 'pages',
      component: PagesListComponent
    },
    {
      path: 'pages/add',
      component: PageFormComponent,
    },
    {
      path: 'pages/:id/edit',
      component: PageFormComponent
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
