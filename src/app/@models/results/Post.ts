import { ListResult } from '../../@common/list/ListResult';
import { Type } from 'class-transformer';
import { Post } from '../posts/Post';
import { SaveModelResponse } from 'app/@common/SaveModelResponse';

export class PostListResult extends ListResult<Post> {
    @Type(() => Post)
    public Data: Post[];
}

export class SavePostResponse extends SaveModelResponse<Post> {}
