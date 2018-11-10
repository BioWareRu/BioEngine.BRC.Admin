import { Injectable } from '@angular/core';
import { BaseService } from '../@common/BaseService';
import { RestClient } from '../@common/HttpClient';
import { Post } from '../@models/Post';
import { PostListResult } from '../@models/results/Post';
import { ClassType } from 'class-transformer/ClassTransformer';
import { SaveModelResponse } from '../@common/SaveModelResponse';

@Injectable()
export class PostsService extends BaseService<Post> {
    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected getResource(): string {
        return 'posts';
    }

    protected getListType(): ClassType<PostListResult> {
        return PostListResult;
    }

    protected getSaveType(): ClassType<SaveModelResponse<Post>> {
        return null;
    }

    protected getType(): ClassType<Post> {
        return Post;
    }
}
