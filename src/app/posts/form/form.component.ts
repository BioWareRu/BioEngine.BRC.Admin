import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AbstractContentFormComponent } from '@common/forms/AbstractContentFormComponent';
import { DialogService } from '@common/modals/DialogService';
import { PageContext } from '@common/PageContext';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { StateService } from '@common/StateService';
import { Post } from '@models/posts/Post';
import { BaseSection } from '@models/BaseSection';
import { Tag } from '@models/Tag';
import { ServicesProvider } from '@services/ServicesProvider';
import { AbstractBaseService } from '@common/abstract-base-service';

@Component({
    selector: 'post-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    providers: [PageContext]
})
export class PostFormComponent extends AbstractContentFormComponent<Post>
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

    public get sectionsService(): AbstractBaseService<BaseSection> {
        return this.servicesProvider.sectionsService;
    }

    public get tagsService(): AbstractBaseService<Tag> {
        return this.servicesProvider.tagsService;
    }
}
