import { Injectable } from '@angular/core';
import { AbstractContentEntityService } from '@common/AbstractContentEntityService';
import { RestClient } from '@common/HttpClient';
import { Post } from '@models/Post';

@Injectable()
export class PostsService extends AbstractContentEntityService<Post> {
    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected _getResource(): string {
        return 'posts';
    }
}