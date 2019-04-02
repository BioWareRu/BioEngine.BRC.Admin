import { Injectable } from '@angular/core';
import { ClassType } from 'class-transformer/ClassTransformer';
import { AbstractServiceWithUpload } from '@common/abstract-base-service';
import { RestClient } from '@common/HttpClient';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { Game } from '@models/Game';
import { GameListResult, SaveGameResponse } from '@models/results/Game';

@Injectable()
export class GamesService extends AbstractServiceWithUpload<Game> {
    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected _getListType(): ClassType<AbstractListResult<Game>> {
        return GameListResult;
    }

    protected _getResource(): string {
        return 'games';
    }

    protected _getSaveType(): ClassType<SaveModelResponse<Game>> {
        return SaveGameResponse;
    }

    protected _getType(): ClassType<Game> {
        return Game;
    }
}
