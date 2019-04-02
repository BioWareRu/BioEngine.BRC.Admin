import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, HostListener, Input, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { ValidatorFn } from '@angular/forms/src/directives/validators';
import { AbstractControlOptions } from '@angular/forms/src/model';
import { IContentEntity } from '@models/interfaces/IContentEntity';
import { plainToClass } from 'class-transformer';
import { CustomValidators } from 'ngx-custom-validators';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AbstractModel } from '@models/base/abstract-model';
import { Properties, PropertiesElementType } from '@models/base/Properties';
import { ISingleSiteEntity, ISiteEntity } from '@models/interfaces/ISiteEntity';
import { Site } from '@models/Site';
import { ServicesProvider } from '@services/ServicesProvider';
import { AbstractBaseService } from '../abstract-base-service';
import { DialogService } from '../modals/DialogService';
import { AbstractPageComponent } from '../abstract-page-component';
import { RestResult } from '../RestResult';
import { SaveModelResponse } from '../SaveModelResponse';
import { SnackBarMessage } from '../snacks/SnackBarMessage';
import { SnackBarService } from '../snacks/SnackBarService';
import { Utils } from '../Utils';
import { BioFormControl } from './BioFormControl';
import { Form } from './Form';

export abstract class AbstractFormPageComponent<TModel extends AbstractModel,
    TResultModel extends SaveModelResponse<TModel>> extends AbstractPageComponent implements OnInit {
    @Input() public model: TModel | null;
    protected _modelId: string;
    protected _isPublished: boolean;
    @ViewChild('modelForm') protected _form: AbstractFormComponent<TModel, TResultModel>;

    ngOnInit(): void {
        const id: Observable<string> = this._route.params.pipe(map(p => p.id));
        id.subscribe(modelId => {
            if (modelId && modelId !== '') {
                this._modelId = modelId;
                this._getService()
                    .get(modelId)
                    .subscribe(model => {
                        this.model = model;
                        this._isPublished = model.isPublished;
                        this._setTitle(model.title);
                        this.loadFormData();
                    });
            } else {
                this._getService()
                    .new()
                    .subscribe(model => {
                        this.model = model;
                        this._setTitle(this._getNewModelTitle());
                        this.loadFormData();
                    });
            }
        });
    }

    loadFormData(): void {
        this._form.loadFormData(this.model);
        this._form.onSuccessSave.subscribe(result => this._processSuccessSave(result));
    }

    protected _processSuccessSave(saveResult: SaveModelResponse<TModel>): void {
        if (!this._modelId) {
            this._router.navigate([this._getRoute(), saveResult.model.id, 'edit']);
        }
    }

    protected abstract _getNewModelTitle(): string;

    protected abstract _getService(): AbstractBaseService<TModel>;

    protected abstract _getRoute(): string;
}

export abstract class AbstractBaseFormComponent {
    @Input() form: Form;
    public formLoaded = false;

    constructor(protected _snackBarService: SnackBarService) {
    }

    initForm(): void {
        this.form = this.form || new Form();
        this._constructForm();
        this.formLoaded = true;
    }

    @HostListener('window:beforeunload', ['$event'])
    checkChanges($event): void {
        if (this.form.hasChanges) {
            $event.returnValue = 'Форма не была сохранена. Данные будут потеряны!';
        }
    }

    registerFormControl(
        name: string,
        validatorOrOpts?: ValidatorFn | Array<ValidatorFn> | AbstractControlOptions | null,
        property: string | null = ''
    ): void {
        if (!property) {
            property = name;
        }
        const control = new BioFormControl(
            this.form,
            name,
            this._getModel(),
            property,
            validatorOrOpts
        );
        this.form.addControl(name, control, property);
    }

    protected abstract _constructForm(): void;

    protected _handleSubmitError(response: HttpErrorResponse): void {
        if (response.status === 422) {
            const data = plainToClass(RestResult, <RestResult>response.error);
            data.errors.forEach(error => {
                const control = this.form.getControlByProperty(error.field);
                control.setServerError(error.message);
            });
            this._snackBarService.error(
                new SnackBarMessage(
                    'Ошибка валидации',
                    'Произошла ошибка валидации, проверьте заполнение формы'
                )
            );
        }
    }

    protected _afterInit(): void {
    }

    public loadFormData(): void {
        this.initForm();
        this._afterInit();
    }

    protected abstract _getModel(): any;
}

export abstract class AbstractSimpleFormComponent<TModel> extends AbstractBaseFormComponent implements OnInit {
    @Input() public model: TModel;

    ngOnInit(): void {
        this.loadFormData();
    }

    protected _getModel(): TModel {
        return this.model;
    }
}

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
                        const fieldProperty = `PropertiesGroups.${groupIndex}.Properties.${propIndex}.Values.${valIndex}.Value`;
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

export abstract class AbstractSiteEntityFormComponent<TModel extends ISiteEntity,
    TSaveModel extends SaveModelResponse<TModel>> extends AbstractFormComponent<TModel, TSaveModel> {
    public get sites(): Observable<Array<Site>> {
        return this.servicesProvider.sitesService.getAll(1, 1000, 'id').pipe(
            map(list => list.data)
        );
    }
}

export abstract class AbstractSingleSiteEntityFormComponent<TModel extends ISingleSiteEntity,
    TSaveModel extends SaveModelResponse<TModel>> extends AbstractFormComponent<TModel, TSaveModel> {
    public get sites(): Observable<Array<Site>> {
        return this.servicesProvider.sitesService.getAll(1, 1000, 'id').pipe(
            map(list => list.data)
        );
    }
}

export abstract class AbstractSectionFormComponent<TModel extends ISiteEntity,
    TSaveModel extends SaveModelResponse<TModel>> extends AbstractSiteEntityFormComponent<TModel, TSaveModel> {
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

export abstract class AbstractContentFormComponent<TModel extends IContentEntity,
    TSaveModel extends SaveModelResponse<TModel>> extends AbstractSiteEntityFormComponent<TModel, TSaveModel> {
    protected constructor(
        private readonly _dialogService: DialogService,
        servicesProvider: ServicesProvider,
        snackBarService: SnackBarService,
        modelService: AbstractBaseService<TModel>,
    ) {
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

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
    transform(value, _args: Array<string>): any {
        const keys: any[] = [];
        // tslint:disable-next-line:forin
        for (const key in value) {
            if (!value.hasOwnProperty(key)) {
                continue;
            }
            keys.push({key, value: value[key]});
        }

        return keys;
    }
}
