import {Injectable} from '@angular/core';
import {Page} from '../@models/Page';
import {BaseService} from '../@common/BaseService';
import {RestClient} from '../@common/HttpClient';
import {PageListResult, SavePageResponse} from '../@models/results/Page';
import {ClassType} from 'class-transformer/ClassTransformer';
import {SaveModelResponse} from '../@common/SaveModelResponse';

@Injectable()
export class PagesService extends BaseService<Page> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected getListType(): ClassType<PageListResult> {
    return PageListResult;
  }

  protected getResource(): string {
    return 'pages';
  }

  protected getType(): ClassType<Page> {
    return Page;
  }

  protected getSaveType(): ClassType<SaveModelResponse<Page>> {
    return SavePageResponse;
  }
}
