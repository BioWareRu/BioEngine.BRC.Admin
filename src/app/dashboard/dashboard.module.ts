import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { BioCommonModule } from '@common/BioCommonModule';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [{
    path: '',
    component: DashboardComponent,
    children: [
        {
            path: 'dashboard',
            component: DashboardComponent
        },
        {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
        }
    ]
}];

@NgModule({
    imports: [
        BioCommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule {
}
