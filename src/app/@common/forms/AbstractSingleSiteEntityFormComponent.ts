import { ISingleSiteEntity } from '@models/interfaces/ISingleSiteEntity';
import { SaveModelResponse } from '../SaveModelResponse';
import { AbstractFormComponent } from './abstract-form-component';
export abstract class AbstractSingleSiteEntityFormComponent<TModel extends ISingleSiteEntity, TSaveModel extends SaveModelResponse<TModel>>
    extends AbstractFormComponent<TModel, TSaveModel> {
}
