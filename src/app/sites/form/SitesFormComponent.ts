import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AbstractFormComponent, PropertiesService, Site, SitesService, SnackBarService } from 'bioengine.core.api.client';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
    selector: 'site-form',
    templateUrl: './SitesFormComponent.html'
})
export class SitesFormComponent extends AbstractFormComponent<Site, SitesService> {
    constructor(
        snackBarService: SnackBarService,
        propertiesService: PropertiesService,
        sitesService: SitesService
    ) {
        super(sitesService, propertiesService, snackBarService);
    }

    protected _constructForm(): void {
        this.registerFormControl('title', [Validators.required]);
        this.registerFormControl('url', [
            Validators.required,
            CustomValidators.url
        ]);
    }
}
