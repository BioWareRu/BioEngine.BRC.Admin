import { Component, OnInit } from '@angular/core';
import { SiteEntityFormComponent } from '../../@common/forms/FormComponent';
import { SavePageResponse } from '../../@models/results/Page';
import { ServicesProvider } from '../../@services/ServicesProvider';
import { Page } from '../../@models/Page';
import { Validators } from '@angular/forms';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';

@Component({
    selector: 'page-form',
    templateUrl: './form.component.html'
})
export class PageFormComponent extends SiteEntityFormComponent<
    Page,
    SavePageResponse
> {
    public constructor(
        snackBarService: SnackBarService,
        servicesProvider: ServicesProvider
    ) {
        super(servicesProvider, snackBarService, servicesProvider.PagesService);
    }

    public constructForm(): void {
        this.registerFormControl('Title', [<any>Validators.required]);
        this.registerFormControl('Url', [<any>Validators.required]);
        this.registerFormControl('SiteIds', [<any>Validators.required]);
        this.registerFormControl('Text', [<any>Validators.required]);
    }
}
