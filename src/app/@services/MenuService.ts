import {Injectable} from '@angular/core';
import {BaseService} from '../@common/BaseService';
import {RestClient} from '../@common/HttpClient';
import {ClassType} from 'class-transformer/ClassTransformer';
import {SaveModelResponse} from '../@common/SaveModelResponse';
import {Menu} from '../@models/Menu';
import {ListResult} from '../@common/list/ListResult';
import {MenuListResult, SaveMenuResponse} from '../@models/results/Menu';

@Injectable()
export class MenuService extends BaseService<Menu> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected getListType(): ClassType<ListResult<Menu>> {
    return MenuListResult;
  }

  protected getResource(): string {
    return 'menu';
  }

  protected getType(): ClassType<Menu> {
    return Menu;
  }

  protected getSaveType(): ClassType<SaveModelResponse<Menu>> {
    return SaveMenuResponse;
  }
}
