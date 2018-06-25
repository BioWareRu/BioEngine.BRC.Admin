import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {SitesComponent} from './sites.component';
import {SitesListComponent} from './list/list.component';
import {SitesFormComponent} from "./form/sites-form.component";

const routes: Routes = [{
  path: '',
  component: SitesComponent,
  children: [
    {
      path: 'list',
      component: SitesListComponent,
    },
    {
      path: 'add',
      component: SitesFormComponent,
    },
    {
      path: ':id/edit',
      component: SitesFormComponent
    },
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SitesRoutingModule {
}
