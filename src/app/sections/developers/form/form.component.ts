import { Component } from '@angular/core';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { AbstractSectionFormComponent } from '@common/forms/abstract-form-component';
import { Developer } from '@models/Developer';
import { SaveDeveloperResponse } from '@models/results/Developer';
import { ServicesProvider } from '@services/ServicesProvider';

@Component({
    selector: 'developer-form',
    templateUrl: './form.component.html'
})
export class DeveloperFormComponent extends AbstractSectionFormComponent<Developer,
    SaveDeveloperResponse> {
    constructor(
        snackBarService: SnackBarService,
        servicesProvider: ServicesProvider
    ) {
        super(
            servicesProvider,
            servicesProvider.developersService,
            snackBarService
        );
    }
}
