import {ListResult} from '../../@common/list/ListResult';
import {SaveModelResponse} from '../../@common/SaveModelResponse';
import {Type} from "class-transformer";
import {Game} from "../Game";

export class GameListResult extends ListResult<Game> {

  @Type(() => Game)
  public Data: Game[];
}

export class SaveGameResponse extends SaveModelResponse<Game> {

}
