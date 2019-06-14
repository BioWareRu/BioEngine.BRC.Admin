import { ITypedEntity } from '@models/interfaces/ITypedEntity';
import { AbstractSection } from './AbstractSection';
export abstract class AbstractTypedSection<TData> extends AbstractSection implements ITypedEntity<TData> {
    public typeTitle: string;
    public data: TData;
}
