import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AbstractSiteEntityFormComponent } from '@common/forms/AbstractSiteEntityFormComponent';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { Ad } from '@models/Ad';
import { SaveAdResponse } from '@models/results/SaveAdResponse';
import { ServicesProvider } from '@services/ServicesProvider';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
    selector: 'ad-form',
    templateUrl: './form.component.html'
})
export class AdFormComponent extends AbstractSiteEntityFormComponent<Ad, SaveAdResponse> {
    public constructor(
        snackBarService: SnackBarService,
        servicesProvider: ServicesProvider
    ) {
        super(servicesProvider, servicesProvider.adsService, snackBarService);
    }

    protected _constructForm(): void {
        this.registerFormControl('url', [Validators.required, CustomValidators.url]);
        this.registerFormControl('title', [Validators.required]);
        this.registerFormControl('siteIds', [Validators.required]);
        this.registerFormControl('picture', [Validators.required]);
    }
}
