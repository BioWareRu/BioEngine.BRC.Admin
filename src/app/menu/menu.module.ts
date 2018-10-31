import {NgModule} from '@angular/core';

import {BioCommonModule} from '../@common/BioCommonModule';
import {BioFormsModule} from '../@common/forms/FormsModule';
import {MenuListComponent} from './list.component';
import {MenuFormComponent} from './form.component';
import {TreeModule} from 'angular-tree-component';
import {MenuItemFormComponent, MenuItemFormDialogComponent} from './menuItemForm.component';
import {RouterModule, Routes} from '@angular/router';
import {DialogService} from '../@common/modals/DialogService';

const routes: Routes = [
    {
        path: 'list',
        component: MenuListComponent,
    },
    {
        path: 'add',
        component: MenuFormComponent,
    },
    {
        path: ':id/edit',
        component: MenuFormComponent
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
        RouterModule.forChild(routes),
        TreeModule.forRoot()
    ],
    declarations: [
        MenuListComponent,
        MenuFormComponent,
        MenuItemFormComponent,
        MenuItemFormDialogComponent
    ],
    entryComponents: [
        MenuItemFormDialogComponent
    ],
    providers: [
        DialogService
    ]
})
export class MenuModule {
}
