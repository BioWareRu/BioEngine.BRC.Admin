import { Type } from 'class-transformer';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { Menu } from '../Menu';

export class MenuListResult extends AbstractListResult<Menu> {

  @Type(() => Menu)
  public data: Array<Menu>;
}

export class SaveMenuResponse extends SaveModelResponse<Menu> {

}
