import { Injectable } from '@angular/core';
import { AbstractServiceWithUpload } from '@common/AbstractServiceWithUpload';
import { RestClient } from '@common/HttpClient';
import { Site } from '@models/Site';

@Injectable()
export class SitesService extends AbstractServiceWithUpload<Site> {
    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected _getResource(): string {
        return 'sites';
    }
}
