import { Type } from 'class-transformer';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { Game } from '../Game';

export class GameListResult extends AbstractListResult<Game> {

  @Type(() => Game)
  public data: Array<Game>;
}


