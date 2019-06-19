import { Injectable } from '@angular/core';
import { AbstractContentEntityService } from '@common/AbstractContentEntityService';
import { RestClient } from '@common/HttpClient';
import { Topic } from '@models/Topic';

@Injectable()
export class TopicsService extends AbstractContentEntityService<Topic> {

    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected _getResource(): string {
        return 'topics';
    }
}
