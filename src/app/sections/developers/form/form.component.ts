import { Component, OnInit } from '@angular/core';
import { Developer } from '../../../@models/Developer';
import { SaveDeveloperResponse } from '../../../@models/results/Developer';
import { ServicesProvider } from '../../../@services/ServicesProvider';
import { SectionFormComponent } from '../../../@common/forms/FormComponent';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';

@Component({
    selector: 'developer-form',
    templateUrl: './form.component.html'
})
export class DeveloperFormComponent extends SectionFormComponent<
    Developer,
    SaveDeveloperResponse
> {
    constructor(
        snackBarService: SnackBarService,
        servicesProvider: ServicesProvider
    ) {
        super(
            servicesProvider,
            snackBarService,
            servicesProvider.DevelopersService
        );
    }
}
