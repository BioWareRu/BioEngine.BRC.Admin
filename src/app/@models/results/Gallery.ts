import {ListResult} from '../../@common/list/ListResult';
import {SaveModelResponse} from '../../@common/SaveModelResponse';
import {Type} from "class-transformer";
import {Gallery} from "../Gallery";

export class GalleryListResult extends ListResult<Gallery> {

  @Type(() => Gallery)
  public Data: Gallery[];
}

export class SaveGalleryResponse extends SaveModelResponse<Gallery> {

}
