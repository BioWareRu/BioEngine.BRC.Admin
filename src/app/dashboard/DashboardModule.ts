import { NgModule } from '@angular/core';
import { MatCardModule, MatGridListModule } from '@angular/material';

import { RouterModule, Routes } from '@angular/router';
import { BrcCommonModule } from '@common/BRCCommonModule';
import { BioCommonModule } from 'bioengine-angular';
import { DashboardComponent } from './DashboardComponent';

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
        BrcCommonModule,
        RouterModule.forChild(routes),
        MatGridListModule,
        MatCardModule,
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
