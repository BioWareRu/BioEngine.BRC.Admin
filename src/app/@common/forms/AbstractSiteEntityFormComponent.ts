import { ISiteEntity } from '@models/interfaces/ISiteEntity';
import { AbstractFormComponent } from './abstract-form-component';
export abstract class AbstractSiteEntityFormComponent<TModel extends ISiteEntity> extends AbstractFormComponent<TModel> {
}
