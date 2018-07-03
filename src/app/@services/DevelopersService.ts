import {Injectable} from "@angular/core";
import {BaseService} from "../@common/BaseService";
import {Developer} from "../@models/Developer";
import {RestClient} from "../@common/HttpClient";
import {ListResult} from "../@common/list/ListResult";
import {DeveloperListResult, SaveDeveloperResponse} from "../@models/results/Developer";
import {ClassType} from "class-transformer/ClassTransformer";
import {SaveModelResponse} from "../@common/SaveModelResponse";

@Injectable()
export class DevelopersService extends BaseService<Developer> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected getListType(): ClassType<ListResult<Developer>> {
    return DeveloperListResult;
  }

  protected getResource(): string {
    return "developers";
  }

  protected getSaveType(): ClassType<SaveModelResponse<Developer>> {
    return SaveDeveloperResponse;
  }

  protected getType(): ClassType<Developer> {
    return Developer;
  }


}
