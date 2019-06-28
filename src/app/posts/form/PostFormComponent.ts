import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { PageContext } from '@common/PageContext';
import { StateService } from '@common/StateService';
import {
    AbstractBaseService,
    AbstractContentFormComponent,
    AbstractSection,
    DialogService,
    Post,
    PostsService, PropertiesService,
    SectionsService,
    SnackBarService,
    Tag, TagsService
} from 'bioengine.core.api.client';

@Component({
    selector: 'post-form',
    templateUrl: './PostFormComponent.html',
    styleUrls: ['./PostFormComponent.scss'],
    providers: [PageContext]
})
export class PostFormComponent extends AbstractContentFormComponent<Post, PostsService>
    implements OnInit, OnDestroy {
    constructor(
        private readonly _stateService: StateService,
        private readonly _sectionsService: SectionsService,
        private readonly _tagsService: TagsService,
        snackBarService: SnackBarService,
        dialogService: DialogService,
        postsService: PostsService,
        propertiesService: PropertiesService
    ) {
        super(dialogService, propertiesService, snackBarService, postsService);
    }

    ngOnInit(): void {
        this._stateService.hideToolbar();
    }

    ngOnDestroy(): void {
        this._stateService.showToolbar();
    }

    protected _constructForm(): void {
        super._constructForm();
        this.registerFormControl('sectionIds', [Validators.required]);
        this.registerFormControl('tagIds', [Validators.required]);
    }

    public get sectionsService(): AbstractBaseService<AbstractSection> {
        return this._sectionsService;
    }

    public get tagsService(): AbstractBaseService<Tag> {
        return this._tagsService;
    }
}
