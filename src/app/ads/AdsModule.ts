import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { BrcBlocksModule } from '@common/blocks/BrcBlocksModule';
import { BrcFormsModule } from '@common/forms/BrcFormsModule';
import { BrcListModule } from '@common/list/BrcListModule';
import { AdFormPageComponent } from './form/AdFormPageComponent';
import { AdFormComponent } from './form/AdFormComponent';
import { AdsListComponent } from './list/AdsListComponent';

const ADS_COMPONENTS = [AdsListComponent, AdFormPageComponent, AdFormComponent];
const routes: Routes = [
    {
        path: 'list',
        component: AdsListComponent
    },
    {
        path: 'add',
        component: AdFormPageComponent
    },
    {
        path: ':id/edit',
        component: AdFormPageComponent
    },
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [BrcListModule, BrcFormsModule, BrcBlocksModule, RouterModule.forChild(routes)],
    declarations: [...ADS_COMPONENTS]
})
export class AdsModule {
}
