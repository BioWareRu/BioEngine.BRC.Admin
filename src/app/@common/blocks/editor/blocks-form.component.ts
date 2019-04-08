import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogService } from '@common/modals/DialogService';
import { AbstractBaseContentBlock, ContentBlockItemType } from '@models/blocks/abstract-content-block';
import { CutBlock } from '@models/blocks/CutBlock';
import { FileBlock } from '@models/blocks/FileBlock';
import { GalleryBlock } from '@models/blocks/GalleryBlock';
import { TextBlock } from '@models/blocks/TextBlock';
import { TwitterBlock } from '@models/blocks/TwitterBlock';
import { YoutubeBlock } from '@models/blocks/YoutubeBlock';
import { BlocksManager } from '../BlocksManager';
import { IContentEntity } from '@models/interfaces/IContentEntity';
import { Form } from './../../forms/Form';
import { QuoteBlock } from '@models/blocks/QuoteBlock';
import { TextBlockFormComponent } from './textblock-form.component';
import { QuoteBlockFormComponent } from './quoteblock-form.component';
import { FileBlockFormComponent } from './fileblock-form.component';
import { GalleryBlockFormComponent } from './galleryblock-form.component';
import { CutBlockFormComponent } from './cutblock-form.component';
import { TwitterBlockFormComponent } from './twitterblock-form.component';
import { YoutubeBlockFormComponent } from './youtubeblock-form.component';

@Component({
    selector: 'blocksForm',
    templateUrl: `./blocks-form.component.html`,
    styleUrls: [`./blocks-form.component.scss`],
    encapsulation: ViewEncapsulation.None
})
export class BlocksFormComponent implements OnInit {
    @Input()
    public form: Form;

    @Input()
    public model: IContentEntity;
    blocksManager: BlocksManager;

    public constructor(private readonly _dialogsService: DialogService) {
    }

    ngOnInit(): void {
        this.blocksManager = new BlocksManager(this.model);

        this.blocksManager.registerBlockType(ContentBlockItemType.Text, TextBlock, TextBlockFormComponent);
        this.blocksManager.registerBlockType(ContentBlockItemType.Quote, QuoteBlock, QuoteBlockFormComponent);
        this.blocksManager.registerBlockType(ContentBlockItemType.File, FileBlock, FileBlockFormComponent);
        this.blocksManager.registerBlockType(ContentBlockItemType.Gallery, GalleryBlock, GalleryBlockFormComponent);
        this.blocksManager.registerBlockType(ContentBlockItemType.Cut, CutBlock, CutBlockFormComponent);
        this.blocksManager.registerBlockType(ContentBlockItemType.Twitter, TwitterBlock, TwitterBlockFormComponent);
        this.blocksManager.registerBlockType(ContentBlockItemType.Youtube, YoutubeBlock, YoutubeBlockFormComponent);

        this.blocksManager.blocks.subscribe(blocks => {
            this.form.getControlByProperty('blocks').patchValue(blocks);
        });

        if (this.model.blocks.length === 0) {
            this.blocksManager.addBlock(this.blocksManager.createBlock(ContentBlockItemType.Text));
            this.blocksManager.update();
        }

    }

    public addBlock(type: ContentBlockItemType): void {
        const block = this.blocksManager.createBlock(type);
        this.blocksManager.addBlock(block);
        this.blocksManager.update();
    }

    public deleteBlock(block: AbstractBaseContentBlock): void {
        this._dialogsService
            .confirm('Удаление блока', 'Вы точно хотите удалить это блок?')
            .onConfirm.subscribe(() => {
            this.blocksManager.removeBlock(block);
            this.blocksManager.update();
        });
    }

    public drop(event: CdkDragDrop<Array<string>>): void {
        this.blocksManager.moveBlock(event.previousIndex, event.currentIndex);
        this.blocksManager.update();
        this.form.hasChanges = true;
    }
}
