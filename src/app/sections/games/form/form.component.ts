import { Component } from '@angular/core';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { AbstractSectionFormComponent } from '@common/forms/AbstractSectionFormComponent';
import { Game } from '@models/Game';
import { SaveGameResponse } from '@models/results/SaveGameResponse';
import { ServicesProvider } from '@services/ServicesProvider';

@Component({
    selector: 'game-form',
    templateUrl: './form.component.html'
})
export class GameFormComponent extends AbstractSectionFormComponent<
    Game,
    SaveGameResponse
> {
    constructor(
        snackBarService: SnackBarService,
        servicesProvider: ServicesProvider
    ) {
        super(servicesProvider, servicesProvider.gamesService, snackBarService);
    }
}
