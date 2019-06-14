import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AbstractContentFormComponent } from '@common/forms/AbstractContentFormComponent';
import { DialogService } from '@common/modals/DialogService';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { Ad } from '@models/Ad';
import { AdsService } from '@services/AdsService';
import { ServicesProvider } from '@services/ServicesProvider';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
    selector: 'ad-form',
    templateUrl: './form.component.html'
})
export class AdFormComponent extends AbstractContentFormComponent<Ad, AdsService> {
    public constructor(
        dialogService: DialogService,
        snackBarService: SnackBarService,
        servicesProvider: ServicesProvider
    ) {
        super(dialogService, servicesProvider, snackBarService, servicesProvider.adsService);
    }

    protected _constructForm(): void {
        this.registerFormControl('url', [Validators.required, CustomValidators.url]);
        this.registerFormControl('title', [Validators.required]);
        this.registerFormControl('siteIds', [Validators.required]);
        this.registerFormControl('picture', [Validators.required]);
    }
}
