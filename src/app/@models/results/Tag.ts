import {ListResult} from '../../@common/list/ListResult';
import {Tag} from '../Tag';
import {SaveModelResponse} from '../../@common/SaveModelResponse';
import {Type} from "class-transformer";

export class TagListResult extends ListResult<Tag> {

  @Type(() => Tag)
  public Data: Tag[];
}

export class SaveTagResponse extends SaveModelResponse<Tag> {

}
