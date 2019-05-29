import { NgModule } from '@angular/core';

import { BlocksModule } from '@common/blocks/blocks.module';
import { PostFormPageComponent } from './form/form-page.component';
import { PostFormComponent } from './form/form.component';
import { ContentListComponent } from './list/list.component';
import { PostsRoutingModule } from './posts-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    imports: [PostsRoutingModule, MatSidenavModule, BlocksModule, MatTabsModule],
    declarations: [ContentListComponent, PostFormComponent, PostFormPageComponent],
    entryComponents: []
})
export class PostsModule {
}
