import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {SitesListComponent} from './list/list.component';
import {SitesFormComponent} from './form/sites-form.component';

const routes: Routes = [
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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SitesRoutingModule {
}
