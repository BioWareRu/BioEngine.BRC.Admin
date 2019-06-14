import { Injectable } from '@angular/core';
import { AbstractServiceWithUpload } from '@common/AbstractServiceWithUpload';
import { RestClient } from '@common/HttpClient';
import { Topic } from '@models/Topic';

@Injectable()
export class TopicsService extends AbstractServiceWithUpload<Topic> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected _getResource(): string {
    return 'topics';
  }
}
