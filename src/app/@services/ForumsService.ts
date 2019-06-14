import { Injectable } from '@angular/core';
import { AbstractBaseService } from '@common/AbstractBaseService';
import { RestClient } from '@common/HttpClient';
import { Forum } from '@models/Forum';

@Injectable()
export class ForumsService extends AbstractBaseService<Forum> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected _getResource(): string {
    return 'ipb/forums';
  }
}
