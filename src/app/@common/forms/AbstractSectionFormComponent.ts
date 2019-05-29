import { Validators } from '@angular/forms';
import { ISiteEntity } from '@models/interfaces/ISiteEntity';
import { SaveModelResponse } from '../SaveModelResponse';
import { Utils } from '../Utils';
import { AbstractSiteEntityFormComponent } from './AbstractSiteEntityFormComponent';
export abstract class AbstractSectionFormComponent<TModel extends ISiteEntity, TSaveModel extends SaveModelResponse<TModel>>
    extends AbstractSiteEntityFormComponent<TModel, TSaveModel> {
    public processChange(key: string, oldValue: any, newValue: any): void {
        if (key === 'title') {
            const origSlug = Utils.slugifyUrl(oldValue);
            if (this.model && (!this.model.url || origSlug === this.model.url)) {
                this.model.url = Utils.slugifyUrl(newValue);
                this.updateControlValue('url');
            }
        }
    }
    protected _constructForm(): void {
        this.registerFormControl('title', [<any>Validators.required]);
        this.registerFormControl('url', [<any>Validators.required]);
        this.registerFormControl('blocks', [<any>Validators.required]);
        this.registerFormControl('hashtag', [<any>Validators.required]);
        this.registerFormControl('logo', [<any>Validators.required]);
        this.registerFormControl('logoSmall', [<any>Validators.required]);
        this.registerFormControl('siteIds', [<any>Validators.required]);
    }
}
