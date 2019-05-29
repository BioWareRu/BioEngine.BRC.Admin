import { Icon } from '@common/shared/icon/Icon';
import { ContentBlockItemType } from './ContentBlockItemType';
export abstract class AbstractBaseContentBlock {
    public id: string;
    public abstract type: ContentBlockItemType;
    public position: number;
    public inFocus = false;
    public abstract title: string;
    public abstract icon: Icon;
}
