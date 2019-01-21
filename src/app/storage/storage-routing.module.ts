import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { StorageManagerPageComponent } from './page/StorageManagerPageComponent';

const routes: Routes = [
    {
        path: 'list',
        component: StorageManagerPageComponent
    },

    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StorageRoutingModule {}
