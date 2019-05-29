import { Validators } from '@angular/forms';
import { IContentEntity } from '@models/interfaces/IContentEntity';
import { ServicesProvider } from '@services/ServicesProvider';
import { AbstractBaseService } from '../abstract-base-service';
import { DialogService } from '../modals/DialogService';
import { SaveModelResponse } from '../SaveModelResponse';
import { SnackBarService } from '../snacks/SnackBarService';
import { AbstractSiteEntityFormComponent } from './AbstractSiteEntityFormComponent';
export abstract class AbstractContentFormComponent<TModel extends IContentEntity, TSaveModel extends SaveModelResponse<TModel>> extends AbstractSiteEntityFormComponent<TModel, TSaveModel> {
    protected constructor(private readonly _dialogService: DialogService, servicesProvider: ServicesProvider, snackBarService: SnackBarService, modelService: AbstractBaseService<TModel>) {
        super(servicesProvider, modelService, snackBarService);
    }
    protected _constructForm(): void {
        this.registerFormControl('title', [<any>Validators.required]);
        this.registerFormControl('url', [<any>Validators.required]);
        this.registerFormControl('blocks', [<any>Validators.required]);
    }
    protected _afterInit(): void {
    }
}
