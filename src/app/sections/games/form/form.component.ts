import { Component } from '@angular/core';
import { DialogService } from '@common/modals/DialogService';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { AbstractSectionFormComponent } from '@common/forms/AbstractSectionFormComponent';
import { Game } from '@models/Game';
import { GamesService } from '@services/GamesService';
import { ServicesProvider } from '@services/ServicesProvider';

@Component({
    selector: 'game-form',
    templateUrl: './form.component.html'
})
export class GameFormComponent extends AbstractSectionFormComponent<Game, GamesService> {
    constructor(
        dialogService: DialogService,
        snackBarService: SnackBarService,
        servicesProvider: ServicesProvider
    ) {
        super(dialogService, servicesProvider, snackBarService, servicesProvider.gamesService);
    }
}
