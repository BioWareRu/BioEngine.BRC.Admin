import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { PictureBlockFormComponent } from '@common/blocks/editor/pictureblock-form.component';
import { DialogService } from '@common/modals/DialogService';
import { AbstractBaseContentBlock } from '@models/base/AbstractBaseContentBlock';
import { ContentBlockItemType } from '@models/blocks/ContentBlockItemType';
import { CutBlock } from '@models/blocks/CutBlock';
import { FileBlock } from '@models/blocks/FileBlock';
import { GalleryBlock } from '@models/blocks/GalleryBlock';
import { PictureBlock } from '@models/blocks/PictureBlock';
import { TextBlock } from '@models/blocks/TextBlock';
import { TwitterBlock } from '@models/blocks/TwitterBlock';
import { YoutubeBlock } from '@models/blocks/YoutubeBlock';
import { BlocksManager } from '../BlocksManager';
import { IContentEntity } from '@models/interfaces/IContentEntity';
import { Form } from './../../forms/Form';
import { TwitchBlock } from '@models/blocks/TwitchBlock';
import { QuoteBlock } from '@models/blocks/QuoteBlock';
import { TextBlockFormComponent } from './textblock-form.component';
import { QuoteBlockFormComponent } from './quoteblock-form.component';
import { FileBlockFormComponent } from './fileblock-form.component';
import { GalleryBlockFormComponent } from './galleryblock-form.component';
import { CutBlockFormComponent } from './cutblock-form.component';
import { TwitterBlockFormComponent } from './twitterblock-form.component';
import { YoutubeBlockFormComponent } from './youtubeblock-form.component';
import { TwitchBlockFormComponent } from './twitchblock-form.component';

@Component({
    selector: 'blocksForm',
    templateUrl: `./blocks-form.component.html`,
    styleUrls: [`./blocks-form.component.scss`],
    encapsulation: ViewEncapsulation.None
})
export class BlocksFormComponent implements OnInit {

    public constructor(private readonly _dialogsService: DialogService) {
    }

    @Input()
    public form: Form;

    @Input()
    public model: IContentEntity;
    public blocksManager: BlocksManager;
    private _blocks: AbstractBaseContentBlock[] = [];

    public static equals(x, y): boolean {
        if (x === y) {
            return true;
        }
        // if both x and y are null or undefined and exactly the same
        if (!(x instanceof Object) || !(y instanceof Object)) {
            return false;
        }
        // if they are not strictly equal, they both need to be Objects
        if (x.constructor !== y.constructor) {
            return false;
        }
        // they must have the exact same prototype chain, the closest we can do is
        // test there constructor.

        let p;
        for (p in x) {
            if (!x.hasOwnProperty(p)) {
                continue;
            }
            // other properties were tested using x.constructor === y.constructor
            if (!y.hasOwnProperty(p)) {
                return false;
            }
            // allows to compare x[ p ] and y[ p ] when set to undefined
            if (x[p] === y[p]) {
                continue;
            }
            // if they have the same strict value or identity then they are equal
            if (typeof (x[p]) !== 'object') {
                return false;
            }
            // Numbers, Strings, Functions, Booleans must be strictly equal
            if (!BlocksFormComponent.equals(x[p], y[p])) {
                return false;
            }
        }
        for (p in y) {
            if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
                return false;
            }
        }
        return true;
    }

    ngOnInit(): void {
        this.blocksManager = new BlocksManager(this.model);

        this.blocksManager.registerBlockType(ContentBlockItemType.Text, TextBlock, TextBlockFormComponent);
        this.blocksManager.registerBlockType(ContentBlockItemType.Quote, QuoteBlock, QuoteBlockFormComponent);
        this.blocksManager.registerBlockType(ContentBlockItemType.File, FileBlock, FileBlockFormComponent);
        this.blocksManager.registerBlockType(ContentBlockItemType.Gallery, GalleryBlock, GalleryBlockFormComponent);
        this.blocksManager.registerBlockType(ContentBlockItemType.Picture, PictureBlock, PictureBlockFormComponent);
        this.blocksManager.registerBlockType(ContentBlockItemType.Cut, CutBlock, CutBlockFormComponent);
        this.blocksManager.registerBlockType(ContentBlockItemType.Twitter, TwitterBlock, TwitterBlockFormComponent);
        this.blocksManager.registerBlockType(ContentBlockItemType.Youtube, YoutubeBlock, YoutubeBlockFormComponent);
        this.blocksManager.registerBlockType(ContentBlockItemType.Twitch, TwitchBlock, TwitchBlockFormComponent);

        this._blocks = this.model.blocks.slice();
        this.blocksManager.blocks.subscribe(blocks => {
            if (!BlocksFormComponent.equals(blocks, this.model.blocks)) {
                this.form.getControlByProperty('blocks').patchValue(blocks);
                this._blocks = this.model.blocks.slice();
            }
        });

        this.form.onChange.subscribe(_ => {
            if (!BlocksFormComponent.equals(this._blocks, this.model.blocks)) {
                this.form.getControlByProperty('blocks').patchValue(this.model.blocks);
                this._blocks = this.model.blocks.slice();
            }
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
