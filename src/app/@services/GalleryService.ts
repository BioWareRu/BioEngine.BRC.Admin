import {Injectable} from '@angular/core';
import {BaseService} from '../@common/BaseService';
import {RestClient} from '../@common/HttpClient';
import {ClassType} from "class-transformer/ClassTransformer";
import {SaveModelResponse} from "../@common/SaveModelResponse";
import {Gallery} from "../@models/Gallery";
import {GalleryListResult, SaveGalleryResponse} from "../@models/results/Gallery";
import {ListResult} from "../@common/list/ListResult";
import {Observable} from "rxjs/Observable";
import {StorageItem} from "../@models/results/StorageItem";
import {map} from "rxjs/operators";
import {plainToClass} from "class-transformer";

@Injectable()
export class GalleryService extends BaseService<Gallery> {

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

  public upload(file): Observable<StorageItem> {
    return this.httpClient.post(this.getResource() + "/upload/", file, {name: file.name}).pipe(map(data => plainToClass(StorageItem, data as StorageItem)))
  }
}
