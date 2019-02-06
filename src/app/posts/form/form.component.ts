import { BlocksManager } from './../../@common/blocks/BlocksManager';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
    Post,
    ContentBlockItemType,
    PostBlock,
    BasePostBlock,
    PostBlockData
} from 'app/@models/Post';
import { SavePostResponse } from 'app/@models/results/Post';
import { TextBlock, TextBlockData } from 'app/@models/TextBlock';
import { GalleryBlock } from 'app/@models/GalleryBlock';
import { FileBlock } from 'app/@models/FileBlock';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';
import { PageContext } from 'app/@common/PageComponent';
import { ContentFormComponent, SimpleFormComponent } from 'app/@common/forms/FormComponent';
import { ServicesProvider } from 'app/@services/ServicesProvider';
import { DialogService } from 'app/@common/modals/DialogService';
import { StateService } from 'app/@common/StateService';
import * as uuid from 'uuid';

@Component({
    selector: 'post-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    providers: [PageContext]
})
export class PostFormComponent extends ContentFormComponent<Post, SavePostResponse>
    implements OnInit, OnDestroy {
    public BlocksManager: BlocksManager;
    constructor(
        servicesProvider: ServicesProvider,
        snackBarService: SnackBarService,
        private _dialogService: DialogService,
        private _stateService: StateService
    ) {
        super(servicesProvider, snackBarService, servicesProvider.PostsService);
    }
    // public BlockTypes = ContentBlockItemType;

    // public lastBlockType: ContentBlockItemType;
    ngOnInit(): void {
        this._stateService.hideToolbar();
    }
    ngOnDestroy(): void {
        this._stateService.showToolbar();
    }

    protected afterInit(): void {
        this.BlocksManager = new BlocksManager(this.model, this._dialogService);

        this.BlocksManager.RegisterBlockType(ContentBlockItemType.Text, TextBlock);
        this.BlocksManager.RegisterBlockType(ContentBlockItemType.File, FileBlock);
        this.BlocksManager.RegisterBlockType(ContentBlockItemType.Gallery, GalleryBlock);

        if (!this.modelId || !this.model.Blocks) {
            // this.addBlock(ContentBlockItemType.Text, new TextBlockData());
            this.BlocksManager.AddBlock(
                this.BlocksManager.CreateBlock(ContentBlockItemType.Gallery)
            );
            this.BlocksManager.Update();
        }
    }

    public addBlock(type: ContentBlockItemType): void {
        const block = this.BlocksManager.CreateBlock(type);
        this.BlocksManager.AddBlock(block);
        this.BlocksManager.Update();
        // let block: PostBlock<any>;
        // const isText = type === ContentBlockItemType.Text;
        // if (!isText && this.lastBlockType === ContentBlockItemType.Text) {
        //     const lastBlock = this.model.Blocks[this.model.Blocks.length - 1];
        //     if (lastBlock.isEmpty()) {
        //         this.model.Blocks.splice(this.model.Blocks.length - 1, 1);
        //     }
        // }
        // switch (type) {
        //     case ContentBlockItemType.Text:
        //         block = new TextBlock();
        //         block.Data = data;
        //         break;
        //     case ContentBlockItemType.Gallery:
        //         block = new GalleryBlock();
        //         break;
        //     case ContentBlockItemType.File:
        //         block = new FileBlock();
        //         break;
        // }
        // block.Id = uuid.v4();
        // block.Position = this.model.Blocks.length;
        // this.model.Blocks.push(block);
        // this.hasChanges = true;
        // this.lastBlockType = type;
        // if (!isText) {
        //     this.addBlock(ContentBlockItemType.Text, new TextBlockData());
        // }
    }

    public deleteBlock(block: BasePostBlock): void {
        this._dialogService
            .confirm('Удаление блока', 'Вы точно хотите удалить это блок?')
            .onConfirm.subscribe(() => {
                this.BlocksManager.RemoveBlock(block);
                this.BlocksManager.Update();
            });
    }

    public drop(event: CdkDragDrop<string[]>): void {
        this.BlocksManager.MoveBlock(event.previousIndex, event.currentIndex);
        this.BlocksManager.Update();
    }
}

export abstract class PostBlockFormComponent<TBlock extends BasePostBlock>
    extends SimpleFormComponent<TBlock>
    implements OnInit {
    @Input()
    public blocksManager: BlocksManager;

    public getFieldName(field: string): string {
        return `${field}${this.Model.Id}`;
    }

    protected afterInit(): void {
        if (this.Model.InFocus) {
            this.setFocus();
        }
    }
    protected setFocus(): void {
        return;
    }

    public processChange(key: string, oldValue: any, newValue: any): void {}
}
