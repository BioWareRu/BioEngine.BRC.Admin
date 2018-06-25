import {ListResult} from "../../@common/list/ListResult";
import {Type} from "class-transformer";
import {BaseSection} from "../Section";

export class SectionsListResult extends ListResult<BaseSection> {

  @Type(() => BaseSection)
  public Data: BaseSection[];
}
