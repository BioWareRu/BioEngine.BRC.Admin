import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SitesListComponent } from './list/list.component';
import { SiteFormPageComponent } from './form/form-page.component';

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
