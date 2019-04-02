import { Injectable } from '@angular/core';
import { ClassType } from 'class-transformer/ClassTransformer';
import { AbstractBaseService } from '@common/abstract-base-service';
import { RestClient } from '@common/HttpClient';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { Menu } from '@models/Menu';
import { MenuListResult, SaveMenuResponse } from '@models/results/Menu';

@Injectable()
export class MenuService extends AbstractBaseService<Menu> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected _getListType(): ClassType<AbstractListResult<Menu>> {
    return MenuListResult;
  }

  protected _getResource(): string {
    return 'menu';
  }

  protected _getType(): ClassType<Menu> {
    return Menu;
  }

  protected _getSaveType(): ClassType<SaveModelResponse<Menu>> {
    return SaveMenuResponse;
  }
}
