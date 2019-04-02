import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AbstractContentFormComponent } from '@common/forms/abstract-form-component';
import { DialogService } from '@common/modals/DialogService';
import { PageContext } from '@common/abstract-page-component';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { StateService } from '@common/StateService';
import { Post } from '@models/posts/Post';
import { SavePostResponse } from '@models/results/Post';
import { BaseSection } from '@models/abstract-section';
import { Tag } from '@models/Tag';
import { ServicesProvider } from '@services/ServicesProvider';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'post-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    providers: [PageContext]
})
export class PostFormComponent extends AbstractContentFormComponent<Post, SavePostResponse>
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

    public get sections(): Observable<Array<BaseSection>> {
        return this.servicesProvider.sectionsService.getAll(1, 1000, 'id').pipe(
            map(list => list.data)
        );
    }

    public get tags(): Observable<Array<Tag>> {
        return this.servicesProvider.tagsService.getAll(1, 1000, 'id').pipe(map(list => list.data));
    }
}
