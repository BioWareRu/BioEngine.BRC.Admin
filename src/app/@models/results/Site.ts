import {ListResult} from '../../@common/list/ListResult';
import {Site} from '../Site';
import {SaveModelResponse} from '../../@common/SaveModelResponse';
import {Type} from "class-transformer";

export class SiteListResult extends ListResult<Site> {

  @Type(() => Site)
  public Data: Site[];
}

export class SaveSiteResponse extends SaveModelResponse<Site> {

}
