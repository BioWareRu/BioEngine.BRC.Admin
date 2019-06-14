import { ISingleSiteEntity } from '@models/interfaces/ISingleSiteEntity';
import { AbstractFormComponent } from './abstract-form-component';
export abstract class AbstractSingleSiteEntityFormComponent<TModel extends ISingleSiteEntity>
    extends AbstractFormComponent<TModel> {
}
