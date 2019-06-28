import { Injectable } from '@angular/core';
import { Forum } from '@models/Forum';
import { AbstractBaseService, RestClient } from 'bioengine-angular';

@Injectable()
export class ForumsService extends AbstractBaseService<Forum> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected _getResource(): string {
    return 'ipb/forums';
  }
}
