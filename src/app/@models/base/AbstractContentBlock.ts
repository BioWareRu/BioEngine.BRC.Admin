import { AbstractContentBlockData } from './AbstractContentBlockData';
import { AbstractBaseContentBlock } from './AbstractBaseContentBlock';
import { ITypedEntity } from '@models/interfaces/ITypedEntity';

export abstract class AbstractContentBlock<T extends AbstractContentBlockData> extends AbstractBaseContentBlock implements ITypedEntity<T> {
    public typeTitle: string;
    public abstract data: T;
}

