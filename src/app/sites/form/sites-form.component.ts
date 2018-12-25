import { FormComponent } from '../../@common/forms/FormComponent';
import { Site } from '../../@models/Site';
import { SaveSiteResponse } from '../../@models/results/Site';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ServicesProvider } from '../../@services/ServicesProvider';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
    selector: 'site-form',
    templateUrl: './site-form.component.html'
})
export class SitesFormComponent extends FormComponent<Site, SaveSiteResponse> {
    constructor(
        snackBarService: SnackBarService,
        servicesProvider: ServicesProvider
    ) {
        super(servicesProvider, snackBarService, servicesProvider.SitesService);
    }

    protected constructForm(): void {
        this.registerFormControl('Title', [<any>Validators.required]);
        this.registerFormControl('Url', [
            <any>Validators.required,
            CustomValidators.url
        ]);
    }
}
