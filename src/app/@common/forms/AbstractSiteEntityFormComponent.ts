import { AbstractBaseService } from '@common/AbstractBaseService';
import { AbstractSiteEntity } from '@models/base/AbstractSiteEntity';
import { AbstractFormComponent } from './AbstractFormComponent';

export abstract class AbstractSiteEntityFormComponent<TModel extends AbstractSiteEntity,
    TService extends AbstractBaseService<TModel>> extends AbstractFormComponent<TModel, TService> {
}
