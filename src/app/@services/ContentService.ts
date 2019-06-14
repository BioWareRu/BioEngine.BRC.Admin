import { Injectable } from '@angular/core';
import { AbstractServiceWithUpload } from '@common/AbstractServiceWithUpload';
import { RestClient } from '@common/HttpClient';
import { Post } from '@models/posts/Post';

@Injectable()
export class PostsService extends AbstractServiceWithUpload<Post> {
    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected _getResource(): string {
        return 'posts';
    }
}
