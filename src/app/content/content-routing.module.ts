import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ContentComponent } from './content.component';
import { ContentListComponent } from './list/list.component';

const routes: Routes = [{
  path: '',
  component: ContentComponent,
  children: [
    {
      path: 'list',
      component: ContentListComponent,
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
