import {NgModule} from '@angular/core';

import {DashboardComponent} from './dashboard.component';
import {BioCommonModule} from '../@common/BioCommonModule';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
    path: '',
    component: DashboardComponent,
    children: [
        {
            path: 'dashboard',
            component: DashboardComponent,
        },
        {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
        },
    ],
}];

@NgModule({
    imports: [
        BioCommonModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        DashboardComponent,
    ]
})
export class DashboardModule {
}
