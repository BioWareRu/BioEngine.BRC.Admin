import { ITypedEntity } from '@models/interfaces/ITypedEntity';
import { AbstractContentItem } from './AbstractContentItem';
export abstract class AbstractTypedContentItem<TData> extends AbstractContentItem implements ITypedEntity<TData> {
    public typeTitle: string;
    public data: TData;
}
