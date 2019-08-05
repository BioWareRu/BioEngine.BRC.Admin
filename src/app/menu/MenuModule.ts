import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';

import { RouterModule, Routes } from '@angular/router';
import { BrcFormsModule } from '@common/forms/BrcFormsModule';
import { BrcListModule } from '@common/list/BrcListModule';
import { BioCommonModule, BioDialogsModule, DialogService } from 'bioengine-angular';
import { MenuFormPageComponent } from './MenuFormPageComponent';
import { MenuFormComponent } from './MenuFormComponent';
import { MenuListComponent } from './MenuListComponent';
import { MenuItemFormComponent } from './MenuItemFormComponent';

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
        MatTreeModule,
        MatCheckboxModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        DragDropModule
    ],
    declarations: [
        MenuListComponent,
        MenuFormComponent,
        MenuItemFormComponent,
        MenuFormPageComponent
    ],
    providers: [DialogService]
})
export class MenuModule {
}
