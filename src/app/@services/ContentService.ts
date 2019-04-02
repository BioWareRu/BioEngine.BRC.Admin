import { Injectable } from '@angular/core';
import { ClassType } from 'class-transformer/ClassTransformer';
import { AbstractServiceWithUpload } from '@common/abstract-base-service';
import { RestClient } from '@common/HttpClient';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { Post } from '@models/posts/Post';
import { PostListResult, SavePostResponse } from '@models/results/Post';

@Injectable()
export class PostsService extends AbstractServiceWithUpload<Post> {
    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected _getResource(): string {
        return 'posts';
    }

    protected _getListType(): ClassType<PostListResult> {
        return PostListResult;
    }

    protected _getSaveType(): ClassType<SaveModelResponse<Post>> {
        return SavePostResponse;
    }

    protected _getType(): ClassType<Post> {
        return Post;
    }
}
