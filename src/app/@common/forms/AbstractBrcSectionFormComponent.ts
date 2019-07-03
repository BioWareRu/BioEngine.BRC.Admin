import { Validators } from '@angular/forms';
import { AbstractBrcSection } from '@models/AbstractBrcSection';
import { AbstractBrcSectionData } from '@models/AbstractBrcSectionData';
import { AbstractContentEntityService, AbstractSectionFormComponent } from 'bioengine-angular';

export abstract class AbstractBrcSectionFormComponent<TModel extends AbstractBrcSection<TData>,
    TData extends AbstractBrcSectionData,
    TService extends AbstractContentEntityService<TModel>>
    extends AbstractSectionFormComponent<TModel, TService> {

    protected _constructForm(): void {
        super._constructForm();
        this.registerFormControl('hashtag', [<any>Validators.required], 'data.hashtag');
        this.registerFormControl('headerPicture', [<any>Validators.required], 'data.headerPicture');
    }
}
