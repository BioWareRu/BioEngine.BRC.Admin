import { Icon } from '@common/shared/icon/Icon';
import { ContentBlockItemType } from '../blocks/ContentBlockItemType';
import { AbstractEntity } from '@models/base/AbstractEntity';
export abstract class AbstractBaseContentBlock extends AbstractEntity {
    public abstract type: ContentBlockItemType;
    public position: number;
    public inFocus = false;
    public abstract icon: Icon;
}
