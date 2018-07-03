import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {ContentComponent} from './content.component';
import {ContentListComponent} from './list/list.component';
import {PostFormComponent} from "./posts/form/form.component";
import {GalleryFormComponent} from "./gallery/form.component";

const routes: Routes = [{
  path: '',
  component: ContentComponent,
  children: [
    {
      path: 'list',
      component: ContentListComponent,
    },
    {
      path: 'list/:type',
      component: ContentListComponent,
    },
    {
      path: 'posts/add',
      component: PostFormComponent,
    },
    {
      path: 'posts/:id/edit',
      component: PostFormComponent
    },
    {
      path: 'gallery/add',
      component: GalleryFormComponent,
    },
    {
      path: 'gallery/:id/edit',
      component: GalleryFormComponent
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
export class ContentRoutingModule {
}
