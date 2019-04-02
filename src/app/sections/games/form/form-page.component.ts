import { Component } from '@angular/core';
import { AbstractBaseService } from '@common/abstract-base-service';
import { AbstractFormPageComponent } from '@common/forms/abstract-form-component';
import { PageContext } from '@common/abstract-page-component';
import { Game } from '@models/Game';
import { SaveGameResponse } from '@models/results/Game';
import { GamesService } from '@services/GamesService';

@Component({
    selector: 'game-form-page',
    template: `
        <game-form class="model-form" #modelForm [model]="model"></game-form>
    `,
    providers: [PageContext]
})
export class GameFormPageComponent extends AbstractFormPageComponent<
    Game,
    SaveGameResponse
> {
    constructor(protected _gamesService: GamesService, context: PageContext) {
        super(context);
    }

    protected _getNewModelTitle(): string {
        return 'Создание игры';
    }

    protected _getRoute(): string {
        return '/sections/games';
    }

    protected _getService(): AbstractBaseService<Game> {
        return this._gamesService;
    }
}
