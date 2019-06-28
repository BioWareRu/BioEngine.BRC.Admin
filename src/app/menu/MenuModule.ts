import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { BrcFormsModule } from '@common/forms/BrcFormsModule';
import { BrcListModule } from '@common/list/BrcListModule';
import { TreeModule } from 'angular-tree-component';
import { BioCommonModule, BioDialogsModule, DialogService } from 'bioengine-angular';
import { MenuFormPageComponent } from './MenuFormPageComponent';
import { MenuFormComponent } from './MenuFormComponent';
import { MenuListComponent } from './MenuListComponent';
import { MenuItemFormComponent } from './MenuItemFormComponent';
import { MenuItemFormDialogComponent } from './MenuItemFormDialogComponent';

const routes: Routes = [
    {
        path: 'list',
        component: MenuListComponent
    },
    {
        path: 'add',
        component: MenuFormPageComponent
    },
    {
        path: ':id/edit',
        component: MenuFormPageComponent
    },
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        BioCommonModule,
        BioDialogsModule,
        BrcFormsModule,
        BrcListModule,
        RouterModule.forChild(routes),
        TreeModule.forRoot()
    ],
    declarations: [
        MenuListComponent,
        MenuFormComponent,
        MenuItemFormComponent,
        MenuItemFormDialogComponent,
        MenuFormPageComponent
    ],
    entryComponents: [MenuItemFormDialogComponent],
    providers: [DialogService]
})
export class MenuModule {
}
