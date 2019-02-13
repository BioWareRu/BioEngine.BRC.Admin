import { YoutubeBlockFormComponent } from './form/blocks/youtubeblock-form.component';
import { CutBlockFormComponent } from './form/blocks/cutblock-form.component';
import { NgModule } from '@angular/core';

import { ContentListComponent } from './list/list.component';
import { PostsRoutingModule } from './posts-routing.module';
import { BioCommonModule } from '../@common/BioCommonModule';
import { BioFormsModule } from '../@common/forms/FormsModule';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PostFormComponent } from './form/form.component';
import { TextBlockFormComponent } from './form/blocks/textblock-form.component';
import { GalleryBlockFormComponent } from './form/blocks/galleryblock-form.component';
import { FileBlockFormComponent } from './form/blocks/fileblock-form.component';
import { PostFormPageComponent } from './form/form-page.component';
import { MatSidenavModule } from '@angular/material';
import { BlockFormComponent } from './form/block-form.component';
import { TwitterBlockFormComponent } from './form/blocks/twitterblock-form.component';
@NgModule({
    imports: [
        PostsRoutingModule,
        BioCommonModule,
        BioFormsModule,
        DragDropModule,
        MatSidenavModule
    ],
    declarations: [
        ContentListComponent,
        PostFormComponent,
        TextBlockFormComponent,
        GalleryBlockFormComponent,
        FileBlockFormComponent,
        PostFormPageComponent,
        BlockFormComponent,
        CutBlockFormComponent,
        TwitterBlockFormComponent,
        YoutubeBlockFormComponent
    ],
    entryComponents: [
        TextBlockFormComponent,
        GalleryBlockFormComponent,
        FileBlockFormComponent,
        CutBlockFormComponent,
        TwitterBlockFormComponent,
        YoutubeBlockFormComponent
    ]
})
export class PostsModule {}
