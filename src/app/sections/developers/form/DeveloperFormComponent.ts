import { Component } from '@angular/core';
import { AbstractBrcSectionFormComponent } from '@common/forms/AbstractBrcSectionFormComponent';
import { Developer } from '@models/Developer';
import { DeveloperData } from '@models/DeveloperData';
import { DevelopersService } from '@services/DevelopersService';
import { DialogService, PropertiesService, SitesService, SnackBarService } from 'bioengine-angular';

@Component({
    selector: 'developer-form',
    templateUrl: './DeveloperFormComponent.html'
})
export class DeveloperFormComponent extends AbstractBrcSectionFormComponent<Developer, DeveloperData, DevelopersService> {
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
