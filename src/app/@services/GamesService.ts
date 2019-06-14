import { Injectable } from '@angular/core';
import { AbstractServiceWithUpload } from '@common/AbstractServiceWithUpload';
import { RestClient } from '@common/HttpClient';
import { Game } from '@models/Game';

@Injectable()
export class GamesService extends AbstractServiceWithUpload<Game> {
    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected _getResource(): string {
        return 'games';
    }
}
