import { NgModule } from '@angular/core';
import { TextBlockFormComponent } from './editor/textblock-form.component';
import { GalleryBlockFormComponent } from './editor/galleryblock-form.component';
import { BlockFormComponent } from './editor/block-form.component';
import { TwitterBlockFormComponent } from './editor/twitterblock-form.component';
import { YoutubeBlockFormComponent } from './editor/youtubeblock-form.component';
import { BioCommonModule } from '../BioCommonModule';
import { BioFormsModule } from '../forms/FormsModule';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CutBlockFormComponent } from './editor/cutblock-form.component';
import { FileBlockFormComponent } from './editor/fileblock-form.component';
import { BlocksFormComponent } from './editor/blocks-form.component';

@NgModule({
    imports: [BioCommonModule, BioFormsModule, DragDropModule],
    exports: [BioCommonModule, BioFormsModule, BlockFormComponent, BlocksFormComponent],
    declarations: [
        BlocksFormComponent,
        TextBlockFormComponent,
        GalleryBlockFormComponent,
        BlockFormComponent,
        TwitterBlockFormComponent,
        YoutubeBlockFormComponent,
        CutBlockFormComponent,
        FileBlockFormComponent
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
export class BlocksModule {}
