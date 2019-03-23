import { ContentFormComponent } from 'app/@common/forms/FormComponent';
import { Component, OnInit } from '@angular/core';
import { SavePageResponse } from '../../@models/results/Page';
import { ServicesProvider } from '../../@services/ServicesProvider';
import { Page } from '../../@models/Page';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';
import { DialogService } from 'app/@common/modals/DialogService';
import { Validators } from '@angular/forms';

@Component({
    selector: 'page-form',
    templateUrl: './form.component.html'
})
export class PageFormComponent extends ContentFormComponent<Page, SavePageResponse> {
    public constructor(
        snackBarService: SnackBarService,
        servicesProvider: ServicesProvider,
        dialogsService: DialogService
    ) {
        super(servicesProvider, snackBarService, servicesProvider.PagesService, dialogsService);
    }

    protected constructForm(): void {
        super.constructForm();
        this.registerFormControl('SiteIds', [<any>Validators.required]);
    }
}
