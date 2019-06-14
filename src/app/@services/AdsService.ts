import { Injectable } from '@angular/core';
import { Ad } from '@models/Ad';
import { AbstractServiceWithUpload } from '@common/AbstractServiceWithUpload';
import { RestClient } from '@common/HttpClient';

@Injectable()
export class AdsService extends AbstractServiceWithUpload<Ad> {

    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected _getResource(): string {
        return 'ads';
    }
}
