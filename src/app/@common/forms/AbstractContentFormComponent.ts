import { Validators } from '@angular/forms';
import { AbstractContentEntityService } from '@common/abstract-content-entity-service';
import { FieldInputChange } from '@common/forms/FieldInputChange';
import { SnackBarMessage } from '@common/snacks/SnackBarMessage';
import { Utils } from '@common/Utils';
import { AbstractEntity } from '@models/base/AbstractEntity';
import { IContentEntity } from '@models/interfaces/IContentEntity';
import { ServicesProvider } from '@services/ServicesProvider';
import { DialogService } from '../modals/DialogService';
import { SnackBarService } from '../snacks/SnackBarService';
import { AbstractSiteEntityFormComponent } from './AbstractSiteEntityFormComponent';

export abstract class AbstractContentFormComponent<TModel extends AbstractEntity & IContentEntity, TService extends AbstractContentEntityService<TModel>>
    extends AbstractSiteEntityFormComponent<TModel, TService> {
    protected constructor(private readonly _dialogService: DialogService,
                          servicesProvider: ServicesProvider,
                          snackBarService: SnackBarService,
                          modelService: TService) {
        super(servicesProvider, modelService, snackBarService);
    }

    protected _constructForm(): void {
        this.registerFormControl('title', [<any>Validators.required]);
        this.registerFormControl('url', [<any>Validators.required]);
        this.registerFormControl('blocks', [<any>Validators.required]);
    }

    protected _afterInit(): void {
        super._afterInit();
        this.form.onChange.subscribe((change: FieldInputChange) => {
            if (change.key === 'title') {
                const origSlug = Utils.slugifyUrl(change.oldValue);
                if (this.model && (!this.model.url || origSlug === this.model.url)) {
                    this.model.url = Utils.slugifyUrl(change.newValue);
                    this.updateControlValue('url');
                }
            }
        });
    }

    public changePublishState(): void {
        this.form.success = false;
        this.form.inProgress = true;
        let result;
        if (!this.model) {
            return;
        }
        if (this.model.isPublished) {
            result = this.service.unpublish(this.model.id);
        } else {
            result = this.service.publish(this.model.id);
        }
        result.subscribe(
            (saveResult: TModel) => {
                this.form.hasChanges = false;
                this.form.success = true;
                this.model = saveResult;
                if (saveResult.isPublished) {
                    this._snackBarService.success(new SnackBarMessage('Успех!', 'Опубликовано.'));
                } else {
                    this._snackBarService.success(
                        new SnackBarMessage('Успех!', 'Публикация снята.')
                    );
                }
                this.form.inProgress = false;
            },
            e => {
                this.form.hasErrors = true;
                this._handleSubmitError(e);
                this.form.inProgress = false;
            }
        );
    }
}
