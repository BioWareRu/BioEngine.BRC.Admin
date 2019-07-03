import { Component } from '@angular/core';
import { AbstractBrcSectionFormComponent } from '@common/forms/AbstractBrcSectionFormComponent';
import { Game } from '@models/Game';
import { GameData } from '@models/GameData';
import { GamesService } from '@services/GamesService';
import { DialogService, PropertiesService, SitesService, SnackBarService } from 'bioengine-angular';

@Component({
    selector: 'game-form',
    templateUrl: './GameFormComponent.html'
})
export class GameFormComponent extends AbstractBrcSectionFormComponent<Game, GameData, GamesService> {
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
