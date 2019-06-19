import { Injectable } from '@angular/core';
import { AbstractBaseService } from '@common/AbstractBaseService';
import { RestClient } from '@common/HttpClient';
import { ContentItemTemplate } from '@models/ContentItemTemplate';

@Injectable()
export class PostTemplatesService extends AbstractBaseService<ContentItemTemplate> {
    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected _getResource(): string {
        return 'posts/templates';
    }
}
