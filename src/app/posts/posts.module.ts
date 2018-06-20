import {NgModule} from '@angular/core';

import {PostsComponent} from './posts.component';
import {PostsListComponent} from './list/list.component';
import {PostsRoutingModule} from './posts-routing.module';
import {ThemeModule} from '../@theme/theme.module';
import {BioCommonModule} from '../@common/BioCommonModule';

const POSTS_COMPONENTS = [
  PostsComponent,
  PostsListComponent,
];

@NgModule({
  imports: [
    PostsRoutingModule,
    ThemeModule,
    BioCommonModule,
  ],
  declarations: [
    ...POSTS_COMPONENTS,
  ],
})
export class PostsModule {
}
