import {ListResult} from '../../@common/list/ListResult';
import {Type} from 'class-transformer';
import {Page} from '../Page';
import {SaveModelResponse} from '../../@common/SaveModelResponse';

export class PageListResult extends ListResult<Page> {

  @Type(() => Page)
  public Data: Page[];
}

export class SavePageResponse extends SaveModelResponse<Page> {

}
