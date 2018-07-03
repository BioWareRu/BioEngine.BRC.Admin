import {BaseService} from "../@common/BaseService";
import {Tag} from "../@models/Tag";
import {ListResult} from "../@common/list/ListResult";
import {ClassType} from "class-transformer/ClassTransformer";
import {SaveModelResponse} from "../@common/SaveModelResponse";
import {SaveTagResponse, TagListResult} from "../@models/results/Tag";
import {RestClient} from "../@common/HttpClient";
import {Injectable} from "@angular/core";

@Injectable()
export class TagsService extends BaseService<Tag> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected getListType(): ClassType<ListResult<Tag>> {
    return TagListResult;
  }

  protected getResource(): string {
    return "tags";
  }

  protected getSaveType(): ClassType<SaveModelResponse<Tag>> {
    return SaveTagResponse;
  }

  protected getType(): ClassType<Tag> {
    return Tag;
  }

}
