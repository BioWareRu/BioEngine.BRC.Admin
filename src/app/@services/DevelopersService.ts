import { Injectable } from '@angular/core';
import { ClassType } from 'class-transformer/ClassTransformer';
import { AbstractServiceWithUpload } from '@common/abstract-base-service';
import { RestClient } from '@common/HttpClient';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { Developer } from '@models/Developer';
import { DeveloperListResult, SaveDeveloperResponse } from '@models/results/Developer';

@Injectable()
export class DevelopersService extends AbstractServiceWithUpload<Developer> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected _getListType(): ClassType<AbstractListResult<Developer>> {
    return DeveloperListResult;
  }

  protected _getResource(): string {
    return 'developers';
  }

  protected _getSaveType(): ClassType<SaveModelResponse<Developer>> {
    return SaveDeveloperResponse;
  }

  protected _getType(): ClassType<Developer> {
    return Developer;
  }
}
