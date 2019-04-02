import { Injectable } from '@angular/core';
import { ClassType } from 'class-transformer/ClassTransformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractBaseService } from '@common/abstract-base-service';
import { RestClient } from '@common/HttpClient';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { PropertiesOption } from '@models/base/Properties';

@Injectable()
export class PropertiesService extends AbstractBaseService<PropertiesOption> {
    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    public getOptions(groupKey: string, propertyKey: string): Observable<Array<PropertiesOption>> {
        return this._httpClient.get(this._getResource(), {
            setKey: groupKey,
            propertyKey
        }).pipe(map((result: AbstractListResult<PropertiesOption>) => {
            return result.data;
        }));
    }

    protected _getResource(): string {
        return 'properties';
    }

    protected _getListType(): ClassType<AbstractListResult<PropertiesOption>> | null {
        return null;
    }

    protected _getSaveType(): ClassType<SaveModelResponse<PropertiesOption>> | null {
        return null;
    }

    protected _getType(): ClassType<PropertiesOption> {
        return PropertiesOption;
    }
}
