import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AbstractContentFormComponent } from '@common/forms/AbstractContentFormComponent';
import { DialogService } from '@common/modals/DialogService';
import { PageContext } from '@common/PageContext';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { StateService } from '@common/StateService';
import { AbstractSection } from '@models/base/AbstractSection';
import { Post } from '@models/Post';
import { Tag } from '@models/Tag';
import { PostsService } from '@services/PostsService';
import { ServicesProvider } from '@services/ServicesProvider';
import { AbstractBaseService } from '@common/AbstractBaseService';

@Component({
    selector: 'post-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    providers: [PageContext]
})
export class PostFormComponent extends AbstractContentFormComponent<Post, PostsService>
    implements OnInit, OnDestroy {
    constructor(
        private readonly _stateService: StateService,
        servicesProvider: ServicesProvider,
        snackBarService: SnackBarService,
        dialogService: DialogService
    ) {
        super(dialogService, servicesProvider, snackBarService, servicesProvider.postsService);
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
        return this.servicesProvider.sectionsService;
    }

    public get tagsService(): AbstractBaseService<Tag> {
        return this.servicesProvider.tagsService;
    }
}
