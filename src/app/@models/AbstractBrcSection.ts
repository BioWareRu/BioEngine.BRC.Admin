import { AbstractBrcSectionData } from '@models/AbstractBrcSectionData';
import { AbstractTypedSection } from 'bioengine-angular';

export abstract class AbstractBrcSection<TData extends AbstractBrcSectionData> extends AbstractTypedSection<TData> {
}
