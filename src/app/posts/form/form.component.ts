import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
    Post,
    ContentBlockItemType,
    PostBlock,
    BasePostBlock
} from 'app/@models/Post';
import { SavePostResponse } from 'app/@models/results/Post';
import { TextBlock } from 'app/@models/TextBlock';
import { GalleryBlock } from 'app/@models/GalleryBlock';
import { FileBlock } from 'app/@models/FileBlock';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';
import { PageContext } from 'app/@common/PageComponent';
import {
    ContentFormComponent,
    SimpleFormComponent
} from 'app/@common/forms/FormComponent';
import { ServicesProvider } from 'app/@services/ServicesProvider';
import { DialogService } from 'app/@common/modals/DialogService';
import { StateService } from 'app/@common/StateService';

@Component({
    selector: 'post-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    providers: [PageContext]
})
export class PostFormComponent
    extends ContentFormComponent<Post, SavePostResponse>
    implements OnInit, OnDestroy {
    constructor(
        servicesProvider: ServicesProvider,
        snackBarService: SnackBarService,
        private _dialogService: DialogService,
        private _stateService: StateService
    ) {
        super(servicesProvider, snackBarService, servicesProvider.PostsService);
    }
    public BlockTypes = ContentBlockItemType;

    public lastBlockType: ContentBlockItemType;
    ngOnInit(): void {
        this._stateService.hideToolbar();
    }
    ngOnDestroy(): void {
        this._stateService.showToolbar();
    }

    protected afterInit(): void {
        if (!this.modelId || !this.model.Blocks) {
            this.addBlock(ContentBlockItemType.Text);
        }
    }

    public addBlock(type: ContentBlockItemType): void {
        let block: PostBlock<any>;
        const isText = type === ContentBlockItemType.Text;
        if (!isText && this.lastBlockType === ContentBlockItemType.Text) {
            const lastBlock = this.model.Blocks[this.model.Blocks.length - 1];
            if (lastBlock.isEmpty()) {
                this.model.Blocks.splice(this.model.Blocks.length - 1, 1);
            }
        }
        switch (type) {
            case ContentBlockItemType.Text:
                block = new TextBlock();
                break;
            case ContentBlockItemType.Gallery:
                block = new GalleryBlock();
                break;
            case ContentBlockItemType.File:
                block = new FileBlock();
                break;
        }
        block.Position = this.model.Blocks.length;
        this.model.Blocks.push(block);
        this.hasChanges = true;
        this.lastBlockType = type;
        if (!isText) {
            this.addBlock(ContentBlockItemType.Text);
        }
    }

    public deleteBlock(block: BasePostBlock): void {
        this._dialogService
            .confirm('Удаление блока', 'Вы точно хотите удалить это блок?')
            .onConfirm.subscribe(() => {
                this.model.Blocks.splice(block.Position, 1);
                this.calculatePositions();
                this.hasChanges = true;
                if (this.model.Blocks.length === 0) {
                    this.addBlock(ContentBlockItemType.Text);
                }
            });
    }

    public drop(event: CdkDragDrop<string[]>): void {
        moveItemInArray(
            this.model.Blocks,
            event.previousIndex,
            event.currentIndex
        );
        this.calculatePositions();
        this.hasChanges = true;
    }

    private calculatePositions(): void {
        let index = 0;

        this.model.Blocks.forEach(block => {
            block.Position = index;
            index++;
            this.lastBlockType = block.Type;
        });
    }
}

export abstract class PostBlockFormComponent<TBlock extends BasePostBlock>
    extends SimpleFormComponent<TBlock>
    implements OnInit {
    @Input()
    public postFormComponent: PostFormComponent;

    public getFieldName(field: string): string {
        return `${field}${this.Model.Position}`;
    }

    public processChange(key: string, oldValue: any, newValue: any): void {
        this.postFormComponent.hasChanges = true;
    }
}
