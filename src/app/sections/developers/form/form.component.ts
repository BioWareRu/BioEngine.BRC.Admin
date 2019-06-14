import { Component } from '@angular/core';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { AbstractSectionFormComponent } from '@common/forms/AbstractSectionFormComponent';
import { Developer } from '@models/Developer';
import { ServicesProvider } from '@services/ServicesProvider';

@Component({
    selector: 'developer-form',
    templateUrl: './form.component.html'
})
export class DeveloperFormComponent extends AbstractSectionFormComponent<Developer> {
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
