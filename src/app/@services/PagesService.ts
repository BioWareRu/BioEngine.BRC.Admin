import { Injectable } from '@angular/core';
import { AbstractBaseService } from '@common/abstract-base-service';
import { RestClient } from '@common/HttpClient';
import { Page } from '@models/Page';

@Injectable()
export class PagesService extends AbstractBaseService<Page> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected _getResource(): string {
    return 'pages';
  }
}
