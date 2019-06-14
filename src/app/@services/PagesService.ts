import { Injectable } from '@angular/core';
import { AbstractContentEntityService } from '@common/abstract-content-entity-service';
import { RestClient } from '@common/HttpClient';
import { Page } from '@models/Page';

@Injectable()
export class PagesService extends AbstractContentEntityService<Page> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected _getResource(): string {
    return 'pages';
  }
}
