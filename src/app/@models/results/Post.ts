import { SaveModelResponse } from '@common/SaveModelResponse';
import { Type } from 'class-transformer';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { Post } from '../posts/Post';

export class PostListResult extends AbstractListResult<Post> {
    @Type(() => Post)
    public data: Array<Post>;
}

export class SavePostResponse extends SaveModelResponse<Post> {}
