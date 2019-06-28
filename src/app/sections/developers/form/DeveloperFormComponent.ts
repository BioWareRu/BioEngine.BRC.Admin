import { Component } from '@angular/core';
import { Developer } from '@models/Developer';
import { DevelopersService } from '@services/DevelopersService';
import { AbstractSectionFormComponent, DialogService, PropertiesService, SitesService, SnackBarService } from 'bioengine.core.api.client';

@Component({
    selector: 'developer-form',
    templateUrl: './DeveloperFormComponent.html'
})
export class DeveloperFormComponent extends AbstractSectionFormComponent<Developer, DevelopersService> {
    constructor(
        public sitesService: SitesService,
        dialogService: DialogService,
        snackBarService: SnackBarService,
        propertiesService: PropertiesService,
        developersService: DevelopersService
    ) {
        super(
            dialogService,
            propertiesService,
            snackBarService,
            developersService
        );
    }
}
