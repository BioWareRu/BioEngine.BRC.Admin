import {Injectable} from "@angular/core";
import {BaseService} from "../@common/BaseService";
import {Game} from "../@models/Game";
import {RestClient} from "../@common/HttpClient";
import {Observable} from "rxjs/Observable";
import {ListResult} from "../@common/list/ListResult";
import {map} from "rxjs/operators";
import {plainToClass} from "class-transformer";
import {GameListResult, SaveGameResponse} from "../@models/results/Game";

@Injectable()
export class GamesService extends BaseService<Game> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  add(item: any): Observable<any> {
    return this.doAdd('games', item).pipe(map(res => plainToClass(SaveGameResponse, res as SaveGameResponse)));
  }

  delete(id: number): Observable<any> {
    return this.doDelete('games', id).pipe(map(res => true));
  }

  get(id: number): Observable<Game> {
    return this.getOne('games', id).pipe(map(res => plainToClass(Game, res as Game)));
  }

  getList(page: number, perPage: number, sort: string): Observable<ListResult<Game>> {
    return this.getAll('games', page, perPage, sort).pipe(map(res => plainToClass(GameListResult, res as GameListResult)));
  }

  update(id: number, item: any): Observable<any> {
    return this.doUpdate('games', id, item).pipe(map(res => plainToClass(SaveGameResponse, res as SaveGameResponse)));
  }

}
