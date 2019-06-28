import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { BrcBlocksModule } from '@common/blocks/BrcBlocksModule';
import { BrcCommonModule } from '@common/BRCCommonModule';
import { BrcFormsModule } from '@common/forms/BrcFormsModule';
import { BrcListModule } from '@common/list/BrcListModule';
import { PageFormPageComponent } from './form/PageFormPageComponent';
import { PageFormComponent } from './form/PageFormComponent';
import { PagesListComponent } from './list/PagesListComponent';

const PAGES_COMPONENTS = [PagesListComponent, PageFormComponent, PageFormPageComponent];
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
    imports: [BrcBlocksModule, BrcListModule, BrcCommonModule, BrcFormsModule, RouterModule.forChild(routes)],
    declarations: [...PAGES_COMPONENTS]
})
export class PagesModule {
}
