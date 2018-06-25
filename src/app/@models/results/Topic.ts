import {ListResult} from '../../@common/list/ListResult';
import {SaveModelResponse} from '../../@common/SaveModelResponse';
import {Type} from "class-transformer";
import {Topic} from "../Topic";

export class TopicListResult extends ListResult<Topic> {

  @Type(() => Topic)
  public Data: Topic[];
}

export class SaveTopicResponse extends SaveModelResponse<Topic> {

}
