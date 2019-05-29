import { AbstractContentBlockData } from './AbstractContentBlockData';
import { AbstractBaseContentBlock } from './AbstractBaseContentBlock';

export abstract class AbstractContentBlock<T extends AbstractContentBlockData> extends AbstractBaseContentBlock {
    public abstract data: T;
}

