import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ServicesProvider } from '../../../@services/ServicesProvider';
import { ContentFormComponent } from '../../../@common/forms/FormComponent';
import { PageContext } from '../../../@common/PageComponent';
import { BaseService } from '../../../@common/BaseService';
import { Post, ContentBlockItemType, PostBlock } from 'app/@models/Post';
import { SavePostResponse } from 'app/@models/results/Post';
import { TextBlock } from 'app/@models/TextBlock';
import { GalleryBlock } from 'app/@models/GalleryBlock';
import { FileBlock } from 'app/@models/FileBlock';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';

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
        snackBarService: SnackBarService
    ) {
        super(servicesProvider, snackBarService, servicesProvider.PostsService);
    }

    protected constructorDataFrom(): void {
        this.registerFormControl(
            'Text',
            [<any>Validators.required],
            'Data.Text'
        );
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
        this.model.Blocks.push(block);
    }

    public drop(event: CdkDragDrop<string[]>): void {
        moveItemInArray(
            this.model.Blocks,
            event.previousIndex,
            event.currentIndex
        );
    }
}
