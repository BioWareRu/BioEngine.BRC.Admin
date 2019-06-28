import { Component } from '@angular/core';
import { Game } from '@models/Game';
import { GamesService } from '@services/GamesService';
import { AbstractSectionFormComponent, DialogService, PropertiesService, SitesService, SnackBarService } from 'bioengine.core.api.client';

@Component({
    selector: 'game-form',
    templateUrl: './GameFormComponent.html'
})
export class GameFormComponent extends AbstractSectionFormComponent<Game, GamesService> {
    constructor(
        public sitesService: SitesService,
        dialogService: DialogService,
        snackBarService: SnackBarService,
        propertiesService: PropertiesService,
        gamesService: GamesService
    ) {
        super(dialogService, propertiesService, snackBarService, gamesService);
    }
}
