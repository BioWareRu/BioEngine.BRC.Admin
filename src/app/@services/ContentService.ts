import { Injectable } from '@angular/core';
import { BaseService, BaseServiceWithUpload } from '../@common/BaseService';
import { RestClient } from '../@common/HttpClient';
import { Post } from '../@models/Post';
import { PostListResult, SavePostResponse } from '../@models/results/Post';
import { ClassType } from 'class-transformer/ClassTransformer';
import { SaveModelResponse } from '../@common/SaveModelResponse';

@Injectable()
export class PostsService extends BaseServiceWithUpload<Post> {
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
        return SavePostResponse;
    }

    protected getType(): ClassType<Post> {
        return Post;
    }
}
