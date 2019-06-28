import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SiteFormPageComponent } from './form/SiteFormPageComponent';
import { SitesListComponent } from './list/SitesListComponent';

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
