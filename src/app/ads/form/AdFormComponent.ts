import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Ad } from '@models/Ad';
import { AdsService } from '@services/AdsService';
import { AbstractContentFormComponent, DialogService, PropertiesService, SitesService, SnackBarService } from 'bioengine.core.api.client';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
    selector: 'ad-form',
    templateUrl: './AdFormComponent.html'
})
export class AdFormComponent extends AbstractContentFormComponent<Ad, AdsService> {
    public constructor(
        public sitesService: SitesService,
        dialogService: DialogService,
        snackBarService: SnackBarService,
        propertiesService: PropertiesService,
        adsService: AdsService
    ) {
        super(dialogService, propertiesService, snackBarService, adsService);
    }

    protected _constructForm(): void {
        this.registerFormControl('url', [Validators.required, CustomValidators.url]);
        this.registerFormControl('title', [Validators.required]);
        this.registerFormControl('siteIds', [Validators.required]);
    }
}
