import { Component, OnInit, Input } from '@angular/core';
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
import { ConfirmationDialogService } from 'app/@common/modals/ConfirmationDialogService';
import { PageContext } from 'app/@common/PageComponent';
import {
    ContentFormComponent,
    SimpleFormComponent
} from 'app/@common/forms/FormComponent';
import { ServicesProvider } from 'app/@services/ServicesProvider';

@Component({
    selector: 'post-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    providers: [PageContext]
})
export class PostFormComponent extends ContentFormComponent<
    Post,
    SavePostResponse
> {
    public BlockTypes = ContentBlockItemType;

    constructor(
        servicesProvider: ServicesProvider,
        snackBarService: SnackBarService,
        private _confirmationService: ConfirmationDialogService
    ) {
        super(servicesProvider, snackBarService, servicesProvider.PostsService);
    }

    public addBlock(type: ContentBlockItemType): void {
        let block: PostBlock<any>;
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
    }

    public deleteBlock(block: BasePostBlock): void {
        const dialog = this._confirmationService.confirm(
            'Удаление блока',
            'Вы точно хотите удалить это блок?'
        );
        dialog.onConfirm.subscribe(() => {
            this.model.Blocks.splice(block.Position, 1);
            this.calculatePositions();
            this.hasChanges = true;
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
        });
    }
}

export abstract class PostBlockFormComponent<TBlock extends BasePostBlock>
    extends SimpleFormComponent<TBlock>
    implements OnInit {
    @Input()
    public postFormComponent: PostFormComponent;

    protected getFieldName(field: string): string {
        return `File${this.Model.Position}`;
    }

    public processChange(key: string, oldValue: any, newValue: any): void {
        this.postFormComponent.hasChanges = true;
    }
}
