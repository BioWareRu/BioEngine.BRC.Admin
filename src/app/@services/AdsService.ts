import { Injectable } from '@angular/core';
import { AbstractContentEntityService } from '@common/abstract-content-entity-service';
import { Ad } from '@models/Ad';
import { RestClient } from '@common/HttpClient';

@Injectable()
export class AdsService extends AbstractContentEntityService<Ad> {

    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected _getResource(): string {
        return 'ads';
    }
}
