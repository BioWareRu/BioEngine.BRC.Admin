import {Injectable} from '@angular/core';
import {BaseServiceWithUpload} from '../@common/BaseService';
import {RestClient} from '../@common/HttpClient';
import {ClassType} from 'class-transformer/ClassTransformer';
import {SaveModelResponse} from '../@common/SaveModelResponse';
import {Gallery} from '../@models/Gallery';
import {GalleryListResult, SaveGalleryResponse} from '../@models/results/Gallery';
import {ListResult} from '../@common/list/ListResult';

@Injectable()
export class GalleryService extends BaseServiceWithUpload<Gallery> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected getListType(): ClassType<ListResult<Gallery>> {
    return GalleryListResult;
  }

  protected getResource(): string {
    return "gallery";
  }

  protected getType(): ClassType<Gallery> {
    return Gallery;
  }

  protected getSaveType(): ClassType<SaveModelResponse<Gallery>> {
    return SaveGalleryResponse;
  }
}
