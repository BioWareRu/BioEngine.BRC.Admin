import {ListResult} from '../../@common/list/ListResult';
import {Type} from 'class-transformer';
import {SaveModelResponse} from '../../@common/SaveModelResponse';
import {Menu} from '../Menu';

export class MenuListResult extends ListResult<Menu> {

  @Type(() => Menu)
  public Data: Menu[];
}

export class SaveMenuResponse extends SaveModelResponse<Menu> {

}
