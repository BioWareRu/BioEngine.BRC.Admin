import { Injectable } from '@angular/core';
import { ClassType } from 'class-transformer/ClassTransformer';
import { AbstractServiceWithUpload } from "@common/AbstractServiceWithUpload";
import { RestClient } from '@common/HttpClient';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { Post } from '@models/posts/Post';
import { PostListResult } from '@models/results/Post';
import { SavePostResponse } from "@models/results/SavePostResponse";

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
