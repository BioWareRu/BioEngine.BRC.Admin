import { Injectable } from '@angular/core';
import { AbstractBaseService } from '@common/AbstractBaseService';
import { RestClient } from '@common/HttpClient';
import { AbstractSection } from '@models/base/AbstractSection';

@Injectable()
export class SectionsService extends AbstractBaseService<AbstractSection> {

    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected _getResource(): string {
        return 'sections';
    }
}
