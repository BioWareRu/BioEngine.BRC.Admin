import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostFormPageComponent } from './form/PostFormPageComponent';
import { PostsListComponent } from './list/PostsListComponent';
import { PostsTemplatesListComponent } from './templates/PostsTemplatesListComponent';

const routes: Routes = [
    {
        path: 'list',
        component: PostsListComponent
    },
    {
        path: 'templates',
        component: PostsTemplatesListComponent
    },
    {
        path: 'add',
        component: PostFormPageComponent
    },
    {
        path: 'add/template/:templateId',
        component: PostFormPageComponent
    },
    {
        path: ':id/edit',
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
export class PostsRoutingModule {}
