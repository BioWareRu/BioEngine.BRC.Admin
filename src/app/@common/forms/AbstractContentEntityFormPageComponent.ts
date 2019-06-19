import { AbstractContentEntityService } from '@common/AbstractContentEntityService';
import { AbstractFormPageComponent } from '@common/forms/AbstractFormPageComponent';
import { IContentEntity } from '@models/interfaces/IContentEntity';

export abstract class AbstractContentEntityFormPageComponent<TModel extends IContentEntity,
    TService extends AbstractContentEntityService<TModel>> extends AbstractFormPageComponent<TModel, TService> {

    protected _loadModel(routeParams: any): void {
        const modelId = routeParams.id;
        const templateId = routeParams.templateId;
        if (modelId && modelId !== '') {
            this._loadModelById(modelId);
        } else if (templateId && templateId !== '') {
            this._loadFromTemplate(templateId);
        } else {
            this._loadNewModel();
        }
    }

    protected _loadFromTemplate(templateId: string): void {
        this._getService().createFromTemplate(templateId).subscribe(res => {
            if (res) {
                this.model = res;
                this._setTitle(this._getNewModelTitle());
                this.loadFormData();
            }
        });
    }

}
