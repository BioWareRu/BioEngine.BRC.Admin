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
    Text = 'BioEngine.Core.Entities.Blocks.TextBlock',
    File = 'BioEngine.Core.Entities.Blocks.FileBlock',
    Gallery = 'BioEngine.Core.Entities.Blocks.GalleryBlock',
    Cut = 'BioEngine.Core.Entities.Blocks.CutBlock',
    Twitter = 'BioEngine.Core.Entities.Blocks.TwitterBlock',
    Youtube = 'BioEngine.Core.Entities.Blocks.YoutubeBlock'
}

export abstract class AbstractContentBlockData {}
