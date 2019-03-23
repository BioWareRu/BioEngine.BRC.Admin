import { DialogService } from 'app/@common/modals/DialogService';
import { IContentEntity } from './../../../@models/interfaces/IContentEntity';
import { ContentBlockItemType, BaseContentBlock } from 'app/@models/blocks/ContentBlock';
import { Form } from './../../forms/Form';
import { Input, OnInit, Component, ViewEncapsulation } from '@angular/core';
import { BlocksManager } from '../BlocksManager';
import { TextBlock } from 'app/@models/blocks/TextBlock';
import { FileBlock } from 'app/@models/blocks/FileBlock';
import { GalleryBlock } from 'app/@models/blocks/GalleryBlock';
import { CutBlock } from 'app/@models/blocks/CutBlock';
import { TwitterBlock } from 'app/@models/blocks/TwitterBlock';
import { YoutubeBlock } from 'app/@models/blocks/YoutubeBlock';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
    selector: 'blocksForm',
    templateUrl: `./blocks-form.component.html`,
    styleUrls: [`./blocks-form.component.scss`],
    encapsulation: ViewEncapsulation.None
})
export class BlocksFormComponent implements OnInit {
    @Input()
    public Form: Form;

    @Input()
    public Model: IContentEntity;
    BlocksManager: any;

    public constructor(private _dialogsService: DialogService) {}

    ngOnInit(): void {
        this.BlocksManager = new BlocksManager(this.Model, this._dialogsService);

        this.BlocksManager.RegisterBlockType(ContentBlockItemType.Text, TextBlock);
        this.BlocksManager.RegisterBlockType(ContentBlockItemType.File, FileBlock);
        this.BlocksManager.RegisterBlockType(ContentBlockItemType.Gallery, GalleryBlock);
        this.BlocksManager.RegisterBlockType(ContentBlockItemType.Cut, CutBlock);
        this.BlocksManager.RegisterBlockType(ContentBlockItemType.Twitter, TwitterBlock);
        this.BlocksManager.RegisterBlockType(ContentBlockItemType.Youtube, YoutubeBlock);

        if (this.Model.Blocks.length === 0) {
            this.BlocksManager.AddBlock(this.BlocksManager.CreateBlock(ContentBlockItemType.Text));
            this.BlocksManager.Update();
        }
    }

    public addBlock(type: ContentBlockItemType): void {
        const block = this.BlocksManager.CreateBlock(type);
        this.BlocksManager.AddBlock(block);
        this.BlocksManager.Update();
    }

    public deleteBlock(block: BaseContentBlock): void {
        this._dialogsService
            .confirm('Удаление блока', 'Вы точно хотите удалить это блок?')
            .onConfirm.subscribe(() => {
                this.BlocksManager.RemoveBlock(block);
                this.BlocksManager.Update();
            });
    }

    public drop(event: CdkDragDrop<string[]>): void {
        this.BlocksManager.MoveBlock(event.previousIndex, event.currentIndex);
        this.BlocksManager.Update();
        this.Form.hasChanges = true;
    }
}
