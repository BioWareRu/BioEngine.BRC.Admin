import { NgModule } from '@angular/core';

import { ContentListComponent } from './list/list.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostFormComponent } from './form/form.component';
import { PostFormPageComponent } from './form/form-page.component';
import { MatSidenavModule } from '@angular/material';
import { BlocksModule } from 'app/@common/blocks/blocks.module';
@NgModule({
    imports: [PostsRoutingModule, MatSidenavModule, BlocksModule],
    declarations: [ContentListComponent, PostFormComponent, PostFormPageComponent],
    entryComponents: []
})
export class PostsModule {}
