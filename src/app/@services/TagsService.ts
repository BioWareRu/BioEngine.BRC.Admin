import {BaseService} from '../@common/BaseService';
import {Tag} from '../@models/Tag';
import {ListResult} from '../@common/list/ListResult';
import {ClassType} from 'class-transformer/ClassTransformer';
import {SaveModelResponse} from '../@common/SaveModelResponse';
import {SaveTagResponse, TagListResult} from '../@models/results/Tag';
import {RestClient} from '../@common/HttpClient';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class TagsService extends BaseService<Tag> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected getListType(): ClassType<ListResult<Tag>> {
    return TagListResult;
  }

  public create(name: string): Observable<SaveModelResponse<Tag>> {
    const tag = new Tag();
    tag.Name = name;
    return this.add(tag);
  }

  protected getSaveType(): ClassType<SaveModelResponse<Tag>> {
    return SaveTagResponse;
  }

  protected getType(): ClassType<Tag> {
    return Tag;
  }

  protected getResource(): string {
    return 'tags';
  }
}
