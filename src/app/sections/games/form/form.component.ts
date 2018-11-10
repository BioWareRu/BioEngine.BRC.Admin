import { Component } from '@angular/core';
import { ServicesProvider } from '../../../@services/ServicesProvider';
import { SectionFormComponent } from '../../../@common/forms/FormComponent';
import { SaveGameResponse } from '../../../@models/results/Game';
import { Game } from '../../../@models/Game';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';

@Component({
    selector: 'game-form',
    templateUrl: './form.component.html'
})
export class GameFormComponent extends SectionFormComponent<
    Game,
    SaveGameResponse
> {
    constructor(
        snackBarService: SnackBarService,
        servicesProvider: ServicesProvider
    ) {
        super(servicesProvider, snackBarService, servicesProvider.GamesService);
    }
}
