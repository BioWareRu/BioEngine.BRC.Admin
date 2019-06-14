import { Injectable } from '@angular/core';
import { AbstractBaseService } from '@common/AbstractBaseService';
import { RestClient } from '@common/HttpClient';
import { Menu } from '@models/Menu';

@Injectable()
export class MenuService extends AbstractBaseService<Menu> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected _getResource(): string {
    return 'menu';
  }
}
