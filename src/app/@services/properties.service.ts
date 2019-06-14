import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractBaseService } from '@common/AbstractBaseService';
import { RestClient } from '@common/HttpClient';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { PropertiesOption } from '@models/PropertiesOption';

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
}
