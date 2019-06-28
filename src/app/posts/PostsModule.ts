import { NgModule } from '@angular/core';
import { BrcBlocksModule } from '@common/blocks/BrcBlocksModule';
import { BrcCommonModule } from '@common/BRCCommonModule';
import { BrcFormsModule } from '@common/forms/BrcFormsModule';
import { BrcListModule } from '@common/list/BrcListModule';

import { PostFormPageComponent } from './form/PostFormPageComponent';
import { PostFormComponent } from './form/PostFormComponent';
import { PostsListComponent } from './list/PostsListComponent';
import { PostsRoutingModule } from './PostsRoutingModule';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { PostsTemplatesListComponent } from './templates/PostsTemplatesListComponent';

@NgModule({
    imports: [PostsRoutingModule, MatSidenavModule, BrcBlocksModule, BrcFormsModule, MatTabsModule, BrcListModule, BrcCommonModule],
    declarations: [PostsListComponent, PostFormComponent, PostFormPageComponent, PostsTemplatesListComponent],
    entryComponents: []
})
export class PostsModule {
}
