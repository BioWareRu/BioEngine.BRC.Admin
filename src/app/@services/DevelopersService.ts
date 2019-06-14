import { Injectable } from '@angular/core';
import { AbstractServiceWithUpload } from '@common/AbstractServiceWithUpload';
import { RestClient } from '@common/HttpClient';
import { Developer } from '@models/Developer';

@Injectable()
export class DevelopersService extends AbstractServiceWithUpload<Developer> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected _getResource(): string {
    return 'developers';
  }
}
