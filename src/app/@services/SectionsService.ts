import { Injectable } from '@angular/core';
import { AbstractBaseService } from '@common/abstract-base-service';
import { RestClient } from '@common/HttpClient';
import { BaseSection } from '@models/BaseSection';

@Injectable()
export class SectionsService extends AbstractBaseService<BaseSection> {

    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected _getResource(): string {
        return 'sections';
    }
}
