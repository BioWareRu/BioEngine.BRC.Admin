import {NgModule} from '@angular/core';

import {BioCommonModule} from '../@common/BioCommonModule';
import {PagesListComponent} from './list/list.component';
import {PageFormComponent} from './form/form.component';
import {BioFormsModule} from '../@common/forms/FormsModule';
// import {TreeModule} from 'angular-tree-component';
import {RouterModule, Routes} from '@angular/router';

const PAGES_COMPONENTS = [
    PagesListComponent,
    PageFormComponent,
];
const routes: Routes = [
    {
        path: 'list',
        component: PagesListComponent,
    },
    {
        path: 'add',
        component: PageFormComponent,
    },
    {
        path: ':id/edit',
        component: PageFormComponent
    },
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [
        BioCommonModule,
        BioFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ...PAGES_COMPONENTS,
    ],
})
export class PagesModule {
}
