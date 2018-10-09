import {Injectable} from '@angular/core';
import {BaseServiceWithUpload} from '../@common/BaseService';
import {Game} from '../@models/Game';
import {RestClient} from '../@common/HttpClient';
import {ListResult} from '../@common/list/ListResult';
import {GameListResult, SaveGameResponse} from '../@models/results/Game';
import {ClassType} from 'class-transformer/ClassTransformer';
import {SaveModelResponse} from '../@common/SaveModelResponse';

@Injectable()
export class GamesService extends BaseServiceWithUpload<Game> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected getListType(): ClassType<ListResult<Game>> {
    return GameListResult;
  }

  protected getResource(): string {
    return "games";
  }

  protected getSaveType(): ClassType<SaveModelResponse<Game>> {
    return SaveGameResponse;
  }

  protected getType(): ClassType<Game> {
    return Game;
  }
}
