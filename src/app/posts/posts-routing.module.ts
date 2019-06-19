import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostFormPageComponent } from './form/form-page.component';
import { ContentListComponent } from './list/list.component';
import { TemplatesListComponent } from './templates/templates.component';

const routes: Routes = [
    {
        path: 'list',
        component: ContentListComponent
    },
    {
        path: 'templates',
        component: TemplatesListComponent
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
