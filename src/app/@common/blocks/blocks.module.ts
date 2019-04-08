import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { BioCommonModule } from '../BioCommonModule';
import { BioFormsModule } from '../forms/FormsModule';
import { BlockFormComponent } from './editor/block-form.component';
import { BlocksFormComponent } from './editor/blocks-form.component';
import { CutBlockFormComponent } from './editor/cutblock-form.component';
import { FileBlockFormComponent } from './editor/fileblock-form.component';
import { GalleryBlockFormComponent } from './editor/galleryblock-form.component';
import { TextBlockFormComponent } from './editor/textblock-form.component';
import { TwitterBlockFormComponent } from './editor/twitterblock-form.component';
import { YoutubeBlockFormComponent } from './editor/youtubeblock-form.component';
import { QuoteBlockFormComponent } from './editor/quoteblock-form.component';
import { TwitchBlockFormComponent } from './editor/twitchblock-form.component';

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
        FileBlockFormComponent,
        QuoteBlockFormComponent,
        TwitchBlockFormComponent
    ],
    entryComponents: [
        TextBlockFormComponent,
        GalleryBlockFormComponent,
        FileBlockFormComponent,
        CutBlockFormComponent,
        TwitterBlockFormComponent,
        YoutubeBlockFormComponent,
        QuoteBlockFormComponent,
        TwitchBlockFormComponent
    ]
})
export class BlocksModule { }
