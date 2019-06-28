import { Injectable } from '@angular/core';
import { Topic } from '@models/Topic';
import { AbstractContentEntityService, RestClient } from 'bioengine-angular';

@Injectable()
export class TopicsService extends AbstractContentEntityService<Topic> {

    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected _getResource(): string {
        return 'topics';
    }
}
