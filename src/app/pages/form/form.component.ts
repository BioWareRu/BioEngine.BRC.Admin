import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AbstractContentFormComponent } from '@common/forms/AbstractContentFormComponent';
import { DialogService } from '@common/modals/DialogService';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { Page } from '@models/Page';
import { PagesService } from '@services/PagesService';
import { ServicesProvider } from '@services/ServicesProvider';

@Component({
    selector: 'page-form',
    templateUrl: './form.component.html'
})
export class PageFormComponent extends AbstractContentFormComponent<Page, PagesService> {
    public constructor(
        snackBarService: SnackBarService,
        servicesProvider: ServicesProvider,
        dialogsService: DialogService
    ) {
        super(dialogsService, servicesProvider, snackBarService, servicesProvider.pagesService);
    }

    protected _constructForm(): void {
        super._constructForm();
        this.registerFormControl('siteIds', [Validators.required]);
    }
}
