import { Icon } from '@common/shared/icon/Icon';

export abstract class AbstractBaseContentBlock {
    public id: string;
    public abstract type: ContentBlockItemType;
    public position: number;
    public inFocus = false;
    public abstract title: string;
    public abstract icon: Icon;
}

export abstract class AbstractContentBlock<T extends AbstractContentBlockData> extends AbstractBaseContentBlock {
    public abstract data: T;
}

export enum ContentBlockItemType {
    Text = 'text',
    Quote = 'quote',
    File = 'file',
    Gallery = 'gallery',
    Cut = 'cut',
    Twitter = 'twitter',
    Youtube = 'youtube',
}

export abstract class AbstractContentBlockData {}
