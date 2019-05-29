import { EventEmitter, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { AbstractModel } from '@models/base/abstract-model';
import { Properties } from '@models/base/Properties';
import { PropertiesElementType } from '@models/base/PropertiesElementType';
import { ServicesProvider } from '@services/ServicesProvider';
import { AbstractBaseService } from '../abstract-base-service';
import { SaveModelResponse } from '../SaveModelResponse';
import { SnackBarMessage } from '../snacks/SnackBarMessage';
import { SnackBarService } from '../snacks/SnackBarService';
import { AbstractBaseFormComponent } from './AbstractBaseFormComponent';
import { Observable } from 'rxjs';

export abstract class AbstractFormComponent<TModel extends AbstractModel,
    TResultModel extends SaveModelResponse<TModel>> extends AbstractBaseFormComponent {
    @Input()
    public model: TModel | null;
    public propertiesElementTypes = PropertiesElementType;
    public modelProperties: Array<Properties> = [];
    protected _modelId: number;
    protected _isPublished: boolean;

    public onSuccessSave: EventEmitter<TResultModel> = new EventEmitter<TResultModel>();
    private _isNew = true;

    protected constructor(
        public servicesProvider: ServicesProvider,
        public service: AbstractBaseService<TModel>,
        snackBarService: SnackBarService
    ) {
        super(snackBarService);
    }

    buildPropertiesForm(): any {
        if (this.model && this.model.propertiesGroups) {
            this.model.propertiesGroups.forEach((propertiesSet, groupIndex) => {
                if (!propertiesSet.isEditable) {
                    return;
                }
                propertiesSet.properties.forEach((prop, propIndex) => {
                    prop.values.forEach((val, valIndex) => {
                        const fieldProperty = `propertiesGroups.${groupIndex}.properties.${propIndex}.values.${valIndex}.value`;
                        let fieldName = propertiesSet.key + prop.key;
                        if (val.siteId) {
                            fieldName += val.siteId;
                        }
                        const validators: any[] = [];
                        if (prop.isRequired) {
                            validators.push(Validators.required);
                        }
                        switch (prop.type) {
                            case PropertiesElementType.Url:
                                validators.push(CustomValidators.url);
                                break;
                        }
                        this.registerFormControl(fieldName, validators, fieldProperty);
                    });
                });
                this.modelProperties.push(propertiesSet);
            });
        }
    }

    public propertiesOptions(groupKey: string, propertyKey: string): Observable<any> {
        return this.servicesProvider.propertiesService.getOptions(groupKey, propertyKey);
    }

    public save(): void {
        this.form.success = false;
        this.form.inProgress = true;
        let result;
        if (this._isNew) {
            result = this._doAdd();
        } else {
            result = this._doUpdate();
        }
        result.subscribe(
            (saveResult: TResultModel) => {
                this.form.hasChanges = false;
                this.form.success = true;
                this.onSuccessSave.emit(saveResult);
                this._snackBarService.success(
                    new SnackBarMessage('Успех!', 'Сохранение прошло успешно.')
                );
                this.form.inProgress = false;
            },
            e => {
                this.form.hasErrors = true;
                this._handleSubmitError(e);
                this.form.inProgress = false;
            }
        );
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

    updateControlValue(name: string): void {
        this.form.updateControlValue(name);
    }

    protected _doAdd(): Observable<SaveModelResponse<TModel>> {
        if (!this.model) {
            throw new Error('Cannot add empty model');
        }
        return this.service.add(this.model);
    }

    protected _doUpdate(): Observable<SaveModelResponse<TModel>> {
        if (!this.model) {
            throw new Error('Cannot update empty model');
        }
        return this.service.update(this.model.id, this.model);
    }

    public loadFormData(model: TModel | null = null): void {
        this.model = model;
        if (this.model && this.model.id !== this.model.emptyId) {
            this._isNew = false;
        }
        this.initForm();
        this.buildPropertiesForm();
        this._afterInit();
    }

    protected _getModel(): any {
        return this.model;
    }
}
