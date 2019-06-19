import { Injectable } from '@angular/core';
import { AbstractContentEntityService } from '@common/AbstractContentEntityService';
import { RestClient } from '@common/HttpClient';
import { Developer } from '@models/Developer';

@Injectable()
export class DevelopersService extends AbstractContentEntityService<Developer> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected _getResource(): string {
    return 'developers';
  }
}
