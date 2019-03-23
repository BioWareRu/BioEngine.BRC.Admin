import { Icon } from 'app/@common/shared/icon/Icon';

export abstract class BaseContentBlock {
    public Id: string;
    public abstract Type: ContentBlockItemType;
    public Position: number;
    public InFocus = false;
    public abstract Title: string;
    public abstract Icon: Icon;
}

export abstract class ContentBlock<T extends ContentBlockData> extends BaseContentBlock {
    public abstract Data: T;
}

export enum ContentBlockItemType {
    Text = 'BioEngine.Core.Entities.Blocks.TextBlock',
    File = 'BioEngine.Core.Entities.Blocks.FileBlock',
    Gallery = 'BioEngine.Core.Entities.Blocks.GalleryBlock',
    Cut = 'BioEngine.Core.Entities.Blocks.CutBlock',
    Twitter = 'BioEngine.Core.Entities.Blocks.TwitterBlock',
    Youtube = 'BioEngine.Core.Entities.Blocks.YoutubeBlock'
}

export abstract class ContentBlockData {}
