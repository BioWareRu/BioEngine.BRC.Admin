import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PostsComponent } from './posts.component';
import { PostsListComponent } from './list/list.component';

const routes: Routes = [{
  path: '',
  component: PostsComponent,
  children: [
    {
      path: 'list',
      component: PostsListComponent,
    },
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {
}
