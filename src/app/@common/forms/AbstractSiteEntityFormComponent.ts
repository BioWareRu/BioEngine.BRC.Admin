import { ISiteEntity } from '@models/interfaces/ISiteEntity';
import { SaveModelResponse } from '../SaveModelResponse';
import { AbstractFormComponent } from './abstract-form-component';
export abstract class AbstractSiteEntityFormComponent<TModel extends ISiteEntity, TSaveModel extends SaveModelResponse<TModel>> extends AbstractFormComponent<TModel, TSaveModel> {
}
