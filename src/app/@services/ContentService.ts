import {Injectable} from "@angular/core";
import {BaseService} from "../@common/BaseService";
import {RestClient} from "../@common/HttpClient";
import {BaseContentItem} from "../@models/ContentItem";
import {ContentListResult} from "../@models/results/Content";
import {ClassType} from "class-transformer/ClassTransformer";
import {SaveModelResponse} from "../@common/SaveModelResponse";

@Injectable()
export class ContentService extends BaseService<BaseContentItem> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected getResource(): string {
    return 'content';
  }

  protected getListType(): ClassType<ContentListResult> {
    return ContentListResult;
  }

  protected getSaveType(): ClassType<SaveModelResponse<BaseContentItem>> {
    return null;
  }

  protected getType(): ClassType<BaseContentItem> {
    return BaseContentItem;
  }

}
