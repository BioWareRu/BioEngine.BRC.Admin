import { Component } from '@angular/core';
import { DialogService } from '@common/modals/DialogService';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { AbstractSectionFormComponent } from '@common/forms/AbstractSectionFormComponent';
import { Developer } from '@models/Developer';
import { DevelopersService } from '@services/DevelopersService';
import { ServicesProvider } from '@services/ServicesProvider';

@Component({
    selector: 'developer-form',
    templateUrl: './form.component.html'
})
export class DeveloperFormComponent extends AbstractSectionFormComponent<Developer, DevelopersService> {
    constructor(
        dialogService: DialogService,
        snackBarService: SnackBarService,
        servicesProvider: ServicesProvider
    ) {
        super(
            dialogService,
            servicesProvider,
            snackBarService,
            servicesProvider.developersService
        );
    }
}
