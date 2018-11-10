import { NgModule } from '@angular/core';

import { BioCommonModule } from '../@common/BioCommonModule';
import { PagesListComponent } from './list/list.component';
import { PageFormComponent } from './form/form.component';
import { BioFormsModule } from '../@common/forms/FormsModule';
import { RouterModule, Routes } from '@angular/router';
import { PageFormPageComponent } from './form/form-page.component';

const PAGES_COMPONENTS = [
    PagesListComponent,
    PageFormComponent,
    PageFormPageComponent
];
const routes: Routes = [
    {
        path: 'list',
        component: PagesListComponent
    },
    {
        path: 'add',
        component: PageFormPageComponent
    },
    {
        path: ':id/edit',
        component: PageFormPageComponent
    },
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [BioCommonModule, BioFormsModule, RouterModule.forChild(routes)],
    declarations: [...PAGES_COMPONENTS]
})
export class PagesModule {}
