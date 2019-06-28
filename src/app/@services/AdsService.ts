import { Injectable } from '@angular/core';
import { Ad } from '@models/Ad';
import { AbstractContentEntityService, RestClient } from 'bioengine-angular';

@Injectable()
export class AdsService extends AbstractContentEntityService<Ad> {

    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected _getResource(): string {
        return 'ads';
    }
}
