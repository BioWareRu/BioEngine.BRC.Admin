import {Injectable} from "@angular/core";
import {BaseService} from "../@common/BaseService";
import {RestClient} from "../@common/HttpClient";
import {BaseSection} from "../@models/Section";
import {SectionsListResult} from "../@models/results/BaseSection";
import {ClassType} from "class-transformer/ClassTransformer";
import {SaveModelResponse} from "../@common/SaveModelResponse";
import {ListResult} from "../@common/list/ListResult";

@Injectable()
export class SectionsService extends BaseService<BaseSection> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected getResource(): string {
    return "sections";
  }

  protected getListType(): ClassType<ListResult<BaseSection>> {
    return SectionsListResult;
  }

  protected getSaveType(): ClassType<SaveModelResponse<BaseSection>> {
    return undefined;
  }

  protected getType(): ClassType<BaseSection> {
    return BaseSection;
  }

}
