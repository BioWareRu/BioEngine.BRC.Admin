import { AbstractTypedContentItem } from '@models/base/AbstractTypedContentItem';

export class PostData {
}

export class Post extends AbstractTypedContentItem<PostData> {
    public isPinned: boolean;
}
