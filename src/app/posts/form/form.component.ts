import { YoutubeBlock } from './../../@models/posts/YoutubeBlock';
import { CutBlock } from 'app/@models/posts/CutBlock';
import { BlocksManager } from './../../@common/blocks/BlocksManager';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post, ContentBlockItemType, BasePostBlock } from 'app/@models/posts/Post';
import { SavePostResponse } from 'app/@models/results/Post';
import { TextBlock } from 'app/@models/posts/TextBlock';
import { GalleryBlock } from 'app/@models/posts/GalleryBlock';
import { FileBlock } from 'app/@models/posts/FileBlock';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';
import { PageContext } from 'app/@common/PageComponent';
import { ContentFormComponent, SimpleFormComponent } from 'app/@common/forms/FormComponent';
import { ServicesProvider } from 'app/@services/ServicesProvider';
import { DialogService } from 'app/@common/modals/DialogService';
import { StateService } from 'app/@common/StateService';
import { TwitterBlock } from 'app/@models/posts/TwitterBlock';

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
        this.BlocksManager.RegisterBlockType(ContentBlockItemType.Cut, CutBlock);
        this.BlocksManager.RegisterBlockType(ContentBlockItemType.Twitter, TwitterBlock);
        this.BlocksManager.RegisterBlockType(ContentBlockItemType.Youtube, YoutubeBlock);

        if (this.model.Blocks.length === 0) {
            this.BlocksManager.AddBlock(this.BlocksManager.CreateBlock(ContentBlockItemType.Text));
            this.BlocksManager.Update();
        }
    }

    public addBlock(type: ContentBlockItemType): void {
        const block = this.BlocksManager.CreateBlock(type);
        this.BlocksManager.AddBlock(block);
        this.BlocksManager.Update();
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
    implements OnInit, OnDestroy {
    @Input()
    public blocksManager: BlocksManager;
    ngOnDestroy(): void {
        this.getFields().forEach(field => {
            this.FormGroup.removeControl(this.getFieldName(field.name));
        });
    }

    public getFieldName(field: string): string {
        return `${field}${this.Model.Id}`;
    }

    protected constructForm(): void {
        this.getFields().forEach(element => {
            this.registerFormControl(
                this.getFieldName(element.name),
                element.validators,
                element.property
            );
        });
    }

    protected abstract getFields(): BlockFieldDescriptor[];
    public abstract isEmpty(): boolean;

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

export class BlockFieldDescriptor {
    public constructor(
        public name: string,
        public validators: any[],
        public property: string = null
    ) {}
}
