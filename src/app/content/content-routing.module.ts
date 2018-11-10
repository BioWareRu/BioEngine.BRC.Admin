import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ContentListComponent } from './list/list.component';
import { PostFormComponent } from './posts/form/form.component';
import { PostFormPageComponent } from './posts/form/form-page.component';

const routes: Routes = [
    {
        path: 'list',
        component: ContentListComponent
    },
    {
        path: 'list/:type',
        component: ContentListComponent
    },
    {
        path: 'posts/add',
        component: PostFormPageComponent
    },
    {
        path: 'posts/:id/edit',
        component: PostFormPageComponent
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
export class ContentRoutingModule {}
