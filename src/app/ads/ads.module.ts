import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { BioCommonModule } from '@common/BioCommonModule';
import { AdFormPageComponent } from './form/form-page.component';
import { AdFormComponent } from './form/form.component';
import { AdsListComponent } from './list/list.component';

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
    imports: [BioCommonModule, RouterModule.forChild(routes)],
    declarations: [...ADS_COMPONENTS]
})
export class AdsModule {
}
