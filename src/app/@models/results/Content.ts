import {ListResult} from "../../@common/list/ListResult";
import {Type} from "class-transformer";
import {BaseContentItem} from "../ContentItem";

export class ContentListResult extends ListResult<BaseContentItem> {

  @Type(() => BaseContentItem)
  public Data: BaseContentItem[];
}
