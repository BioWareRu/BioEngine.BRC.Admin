import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SectionsComponent} from "./sections.component";
import {SectionsListComponent} from "./list/list.component";
import {DeveloperFormComponent} from "./developers/form/form.component";

const routes: Routes = [{
  path: '',
  component: SectionsComponent,
  children: [
    {
      path: 'list',
      component: SectionsListComponent,
    },
    {
      path: 'list/:type',
      component: SectionsListComponent,
    },
    {
      path: 'developers/add',
      component: DeveloperFormComponent,
    },
    {
      path: 'developers/:id/edit',
      component: DeveloperFormComponent
    },
    /*
    {
      path: 'games/add',
      component: SitesFormComponent,
    },
    {
      path: 'topics/add',
      component: SitesFormComponent,
    },

    {
      path: 'games/:id/edit',
      component: SitesFormComponent
    },
    {
      path: 'topics/:id/edit',
      component: SitesFormComponent
    },*/
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
export class SectionsRoutingModule {
}
