import {BaseService} from '../@common/BaseService';
import {RestClient} from '../@common/HttpClient';
import {ClassType} from 'class-transformer/ClassTransformer';
import {SaveModelResponse} from '../@common/SaveModelResponse';
import {ListResult} from '../@common/list/ListResult';
import {Injectable} from '@angular/core';
import {SettingsOption} from '../@models/base/Settings';

@Injectable()
export class SettingsService extends BaseService<SettingsOption> {
  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  public getOptions(groupKey: string, propertyKey: string) {
    return this.httpClient.get(this.getResource(), {
      settingsKey: groupKey,
      propertyKey: propertyKey,
    });
  }

  protected getResource(): string {
    return 'settings';
  }

  protected getListType(): ClassType<ListResult<SettingsOption>> {
    return null;
  }

  protected getSaveType(): ClassType<SaveModelResponse<SettingsOption>> {
    return null;
  }

  protected getType(): ClassType<SettingsOption> {
    return SettingsOption;
  }
}
