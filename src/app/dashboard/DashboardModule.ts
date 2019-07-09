import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

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
        MatListModule
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
