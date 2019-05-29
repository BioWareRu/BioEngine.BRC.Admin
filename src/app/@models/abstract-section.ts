import { BaseSection } from './BaseSection';
import { AbstractTypedData } from './AbstractTypedData';

export abstract class AbstractSection<T extends AbstractTypedData> extends BaseSection {
    public abstract data: T;
}


