import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { SitesService } from '@services/SitesService';
import { CustomValidators } from 'ngx-custom-validators';
import { AbstractFormComponent } from '@common/forms/AbstractFormComponent';
import { ServicesProvider } from '@services/ServicesProvider';
import { Site } from '@models/Site';

@Component({
    selector: 'site-form',
    templateUrl: './site-form.component.html'
})
export class SitesFormComponent extends AbstractFormComponent<Site, SitesService> {
    constructor(
        snackBarService: SnackBarService,
        servicesProvider: ServicesProvider
    ) {
        super(servicesProvider, servicesProvider.sitesService, snackBarService);
    }

    protected _constructForm(): void {
        this.registerFormControl('title', [Validators.required]);
        this.registerFormControl('url', [
            Validators.required,
            CustomValidators.url
        ]);
    }
}
