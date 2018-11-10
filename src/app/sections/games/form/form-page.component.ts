import { FormPageComponent } from 'app/@common/forms/FormComponent';
import { BaseService } from 'app/@common/BaseService';
import { PageContext } from 'app/@common/PageComponent';
import { Component } from '@angular/core';
import { Game } from 'app/@models/Game';
import { SaveGameResponse } from 'app/@models/results/Game';
import { GamesService } from 'app/@services/GamesService';

@Component({
    selector: 'game-form-page',
    template: `
        <game-form class="model-form" #modelForm [model]="Model"></game-form>
    `,
    providers: [PageContext]
})
export class GameFormPageComponent extends FormPageComponent<
    Game,
    SaveGameResponse
> {
    constructor(context: PageContext, protected gamesService: GamesService) {
        super(context);
    }

    protected getNewModelTitle(): string {
        return 'Создание игры';
    }

    protected getRoute(): string {
        return '/sections/games';
    }

    protected getService(): BaseService<Game> {
        return this.gamesService;
    }
}
