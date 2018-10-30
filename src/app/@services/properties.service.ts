import {BaseService} from '../@common/BaseService';
import {RestClient} from '../@common/HttpClient';
import {ClassType} from 'class-transformer/ClassTransformer';
import {SaveModelResponse} from '../@common/SaveModelResponse';
import {ListResult} from '../@common/list/ListResult';
import {Injectable} from '@angular/core';
import {PropertiesOption} from '../@models/base/Properties';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class PropertiesService extends BaseService<PropertiesOption> {
    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    public getOptions(groupKey: string, propertyKey: string): Observable<PropertiesOption[]> {
        return this.httpClient.get(this.getResource(), {
            setKey: groupKey,
            propertyKey: propertyKey,
        }).pipe(map((result: ListResult<PropertiesOption>) => {
            return result.Data;
        }));
    }

    protected getResource(): string {
        return 'properties';
    }

    protected getListType(): ClassType<ListResult<PropertiesOption>> {
        return null;
    }

    protected getSaveType(): ClassType<SaveModelResponse<PropertiesOption>> {
        return null;
    }

    protected getType(): ClassType<PropertiesOption> {
        return PropertiesOption;
    }
}
