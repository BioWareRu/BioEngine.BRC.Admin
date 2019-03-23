import { YoutubeBlock } from '../../@models/blocks/YoutubeBlock';
import { CutBlock } from 'app/@models/blocks/CutBlock';
import { BlocksManager } from './../../@common/blocks/BlocksManager';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SavePostResponse } from 'app/@models/results/Post';
import { TextBlock } from 'app/@models/blocks/TextBlock';
import { GalleryBlock } from 'app/@models/blocks/GalleryBlock';
import { FileBlock } from 'app/@models/blocks/FileBlock';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';
import { PageContext } from 'app/@common/PageComponent';
import { ContentFormComponent, SimpleFormComponent } from 'app/@common/forms/FormComponent';
import { ServicesProvider } from 'app/@services/ServicesProvider';
import { DialogService } from 'app/@common/modals/DialogService';
import { StateService } from 'app/@common/StateService';
import { TwitterBlock } from 'app/@models/blocks/TwitterBlock';
import { Post } from 'app/@models/posts/Post';
import { ContentBlockItemType, BaseContentBlock } from 'app/@models/blocks/ContentBlock';
import { Observable } from 'rxjs';
import { BaseSection } from 'app/@models/Section';
import { map } from 'rxjs/operators';
import { Tag } from 'app/@models/Tag';
import { Validators } from '@angular/forms';

@Component({
    selector: 'post-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    providers: [PageContext]
})
export class PostFormComponent extends ContentFormComponent<Post, SavePostResponse>
    implements OnInit, OnDestroy {
    constructor(
        servicesProvider: ServicesProvider,
        snackBarService: SnackBarService,
        dialogService: DialogService,
        private _stateService: StateService
    ) {
        super(servicesProvider, snackBarService, servicesProvider.PostsService, dialogService);
    }

    ngOnInit(): void {
        this._stateService.hideToolbar();
    }
    ngOnDestroy(): void {
        this._stateService.showToolbar();
    }

    protected constructForm(): void {
        super.constructForm();
        this.registerFormControl('SectionIds', [<any>Validators.required]);
        this.registerFormControl('TagIds', [<any>Validators.required]);
    }

    protected get Sections(): Observable<BaseSection[]> {
        return this.servicesProvider.SectionsService.getAll(1, 1000, 'id').pipe(
            map(list => list.Data)
        );
    }

    protected get Tags(): Observable<Tag[]> {
        return this.servicesProvider.TagsService.getAll(1, 1000, 'id').pipe(map(list => list.Data));
    }
}
