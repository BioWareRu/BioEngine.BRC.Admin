import { Injectable } from '@angular/core';
import { Game } from '@models/Game';
import { AbstractContentEntityService, RestClient } from 'bioengine.core.api.client';

@Injectable()
export class GamesService extends AbstractContentEntityService<Game> {
    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected _getResource(): string {
        return 'games';
    }
}
