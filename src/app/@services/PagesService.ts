import { Injectable } from '@angular/core';
import { ClassType } from 'class-transformer/ClassTransformer';
import { AbstractBaseService } from '@common/abstract-base-service';
import { RestClient } from '@common/HttpClient';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { Page } from '@models/Page';
import { PageListResult, SavePageResponse } from '@models/results/Page';

@Injectable()
export class PagesService extends AbstractBaseService<Page> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected _getListType(): ClassType<PageListResult> {
    return PageListResult;
  }

  protected _getResource(): string {
    return 'pages';
  }

  protected _getType(): ClassType<Page> {
    return Page;
  }

  protected _getSaveType(): ClassType<SaveModelResponse<Page>> {
    return SavePageResponse;
  }
}
