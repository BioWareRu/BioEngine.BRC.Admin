import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SiteFormPageComponent } from './form/form-page.component';
import { SitesListComponent } from './list/list.component';

const routes: Routes = [
    {
        path: 'list',
        component: SitesListComponent
    },
    {
        path: 'add',
        component: SiteFormPageComponent
    },
    {
        path: ':id/edit',
        component: SiteFormPageComponent
    },
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SitesRoutingModule {}
