import {ListResult} from '../../@common/list/ListResult';
import {SaveModelResponse} from '../../@common/SaveModelResponse';
import {Type} from "class-transformer";
import {Developer} from "../Developer";

export class DeveloperListResult extends ListResult<Developer> {

  @Type(() => Developer)
  public Data: Developer[];
}

export class SaveDeveloperResponse extends SaveModelResponse<Developer> {

}
