import { FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import { RestResult } from '../RestResult';
import { HostListener, Input, OnInit } from '@angular/core';
import { BioFormControl } from './BioFormControl';
import { plainToClass } from 'class-transformer';
import { ServicesProvider } from '../../@services/ServicesProvider';
import {
    ISiteEntity,
    ISingleSiteEntity
} from '../../@models/interfaces/ISiteEntity';
import { ISectionEntity } from '../../@models/interfaces/ISectionEntity';
import { AbstractControlOptions } from '@angular/forms/src/model';
import { ValidatorFn } from '@angular/forms/src/directives/validators';
import { PageComponent, PageContext } from '../PageComponent';
import { Utils } from '../Utils';
import { SaveModelResponse } from '../SaveModelResponse';
import { BaseService } from '../BaseService';
import { map } from 'rxjs/operators';
import { Model } from '../../@models/base/Model';
import {
    Properties,
    PropertiesElementType
} from '../../@models/base/Properties';
import { CustomValidators } from 'ng4-validators';
import { BaseSection } from '../../@models/Section';
import { Tag } from '../../@models/Tag';
import { Site } from '../../@models/Site';
import { SnackBarMessage } from '../snacks/SnackBarMessage';

export abstract class BaseFormComponent extends PageComponent
    implements OnInit {
    public success = false;
    public inProgress = false;
    public hasErrors = false;
    public hasChanges = false;

    public isNew = false;

    public formLoaded = false;

    public formGroup: FormGroup;
    protected controls: { [p: string]: BioFormControl } = {};
    protected controlsByProperty: { [p: string]: BioFormControl } = {};

    initForm(): void {
        this.constructForm();
        this.formGroup = new FormGroup(this.controls);
        this.formLoaded = true;
    }

    @HostListener('window:beforeunload', ['$event'])
    checkChanges($event): void {
        if (this.hasChanges) {
            $event.returnValue =
                'Форма не была сохранена. Данные будут потеряны!';
        }
    }

    public registerChange(key: string, oldValue: any, newValue: any): void {
        this.hasChanges = true;
        this.hasErrors = false;
        this.success = false;
        this.processChange(key, oldValue, newValue);
    }

    public processChange(key: string, oldValue: any, newValue: any): void {}

    registerFormControl(
        name: string,
        validatorOrOpts?:
            | ValidatorFn
            | ValidatorFn[]
            | AbstractControlOptions
            | null,
        property: string = null
    ): void {
        if (property == null) {
            property = name;
        }
        this.controls[name] = this.controlsByProperty[
            property
        ] = new BioFormControl(
            <BaseFormComponent>this,
            name,
            this.getModel(),
            property,
            validatorOrOpts
        );
    }

    ngOnInit(): void {
        this.loadFormData();
    }

    protected abstract constructForm(): void;

    protected handleSubmitError(response: HttpErrorResponse): void {
        if (response.status === 422) {
            const data: RestResult = plainToClass(
                RestResult,
                response.error as RestResult
            );
            data.Errors.forEach(error => {
                const control = this.controlsByProperty[error.Field];
                control.setServerError(error.Message);
            });
            this.SnackBarService.error(
                new SnackBarMessage(
                    'Ошибка валидации',
                    'Произошла ошибка валидации, проверьте заполнение формы'
                )
            );
        }
    }

    protected afterInit(): void {}

    protected loadFormData(): void {
        this.initForm();
        this.afterInit();
    }

    protected abstract getModel(): any;
}

export abstract class SimpleFormComponent<TModel> extends BaseFormComponent
    implements OnInit {
    @Input() public Model: TModel;

    protected constructor(context: PageContext) {
        super(context);
    }

    protected getModel(): TModel {
        return this.Model;
    }
}

export abstract class FormComponent<
    TModel extends Model,
    TResultModel extends SaveModelResponse<TModel>
> extends BaseFormComponent implements OnInit {
    public model: TModel;
    public PropertiesElementTypes = PropertiesElementType;
    public ModelProperties: Properties[] = [];
    protected modelId: number;
    protected isPublished: boolean;

    protected constructor(
        context: PageContext,
        public servicesProvider: ServicesProvider
    ) {
        super(context);
    }

    buildPropertiesForm(): any {
        if (this.model.PropertiesGroups) {
            this.model.PropertiesGroups.forEach((propertiesSet, groupIndex) => {
                if (!propertiesSet.IsEditable) {
                    return;
                }
                propertiesSet.Properties.forEach((prop, propIndex) => {
                    prop.Values.forEach((val, valIndex) => {
                        const fieldProperty = `PropertiesGroups.${groupIndex}.Properties.${propIndex}.Values.${valIndex}.Value`;
                        let fieldName = propertiesSet.Key + prop.Key;
                        if (val.SiteId) {
                            fieldName += val.SiteId;
                        }
                        const validators = [];
                        if (prop.IsRequired) {
                            validators.push(<any>Validators.required);
                        }
                        switch (prop.Type) {
                            case PropertiesElementType.Url:
                                validators.push(CustomValidators.url);
                                break;
                        }
                        this.registerFormControl(
                            fieldName,
                            validators,
                            fieldProperty
                        );
                    });
                });
                this.ModelProperties.push(propertiesSet);
            });
        }
    }

    public PropertiesOptions(
        groupKey: string,
        propertyKey: string
    ): Observable<any> {
        return this.servicesProvider.PropertiesService.getOptions(
            groupKey,
            propertyKey
        );
    }

    ngOnInit(): void {
        const id: Observable<number> = this.Route.params.pipe(map(p => p.id));
        id.subscribe(modelId => {
            if (modelId > 0) {
                this.modelId = modelId;
                this.getService()
                    .get(modelId)
                    .subscribe(model => {
                        this.model = model;
                        this.isPublished = model.IsPublished;
                        this.setTitle(model.Title);
                        this.loadFormData();
                    });
            } else {
                this.isNew = true;
                this.getService()
                    .new()
                    .subscribe(model => {
                        this.model = model;
                        this.setTitle(this.getNewModelTitle());
                        this.loadFormData();
                    });
            }
        });
    }

    public save(): void {
        this.success = false;
        this.inProgress = true;
        let result;
        if (this.isNew) {
            result = this.doAdd();
        } else {
            result = this.doUpdate();
        }
        result.subscribe(
            (saveResult: TResultModel) => {
                this.hasChanges = false;
                this.success = true;
                this.processSuccessSave(saveResult);
                this.SnackBarService.success(
                    new SnackBarMessage('Успех!', 'Сохранение прошло успешно.')
                );
                this.inProgress = false;
            },
            e => {
                this.hasErrors = true;
                this.handleSubmitError(e);
                this.inProgress = false;
            }
        );
    }

    public changePublishState(): void {
        this.success = false;
        this.inProgress = true;
        let result;
        if (this.model.IsPublished) {
            result = this.getService().unpublish(this.model.Id);
        } else {
            result = this.getService().publish(this.model.Id);
        }
        result.subscribe(
            (saveResult: TModel) => {
                this.hasChanges = false;
                this.success = true;
                this.model = saveResult;
                if (saveResult.IsPublished) {
                    this.SnackBarService.success(
                        new SnackBarMessage('Успех!', 'Опубликовано.')
                    );
                } else {
                    this.SnackBarService.success(
                        new SnackBarMessage('Успех!', 'Публикация снята.')
                    );
                }
                this.inProgress = false;
            },
            e => {
                this.hasErrors = true;
                this.handleSubmitError(e);
                this.inProgress = false;
            }
        );
    }

    updateControlValue(name: string): void {
        this.controls[name].reloadValue();
    }

    protected doAdd(): Observable<SaveModelResponse<TModel>> {
        return this.getService().add(this.model);
    }

    protected doUpdate(): Observable<SaveModelResponse<TModel>> {
        return this.getService().update(this.modelId, this.model);
    }

    protected loadFormData(): void {
        this.buildPropertiesForm();
        super.loadFormData();
    }

    protected abstract getNewModelTitle(): string;

    protected abstract getService(): BaseService<TModel>;

    protected processSuccessSave(saveResult: SaveModelResponse<TModel>): void {
        if (!this.modelId) {
            this.Router.navigate([
                this.getRoute(),
                saveResult.Model.Id,
                'edit'
            ]);
        }
    }

    protected abstract getRoute(): string;

    protected getModel(): any {
        return this.model;
    }
}

export abstract class SiteEntityFormComponent<
    TModel extends ISiteEntity,
    TSaveModel extends SaveModelResponse<TModel>
> extends FormComponent<TModel, TSaveModel> {
    protected get Sites(): Observable<Site[]> {
        return this.servicesProvider.SitesService.getAll(1, 1000, 'id').pipe(
            map(list => list.Data)
        );
    }
}

export abstract class SingleSiteEntityFormComponent<
    TModel extends ISingleSiteEntity,
    TSaveModel extends SaveModelResponse<TModel>
> extends FormComponent<TModel, TSaveModel> {
    protected get Sites(): Observable<Site[]> {
        return this.servicesProvider.SitesService.getAll(1, 1000, 'id').pipe(
            map(list => list.Data)
        );
    }
}

export abstract class SectionFormComponent<
    TModel extends ISiteEntity,
    TSaveModel extends SaveModelResponse<TModel>
> extends SiteEntityFormComponent<TModel, TSaveModel> {
    public processChange(key: string, oldValue: any, newValue: any): void {
        if (key === 'Title') {
            const origSlug = Utils.slugifyUrl(oldValue);
            if (!this.model.Url || origSlug === this.model.Url) {
                this.model.Url = Utils.slugifyUrl(newValue);
                this.updateControlValue('Url');
            }
            this.setTitle(this.model.Title);
        }
    }

    protected constructForm(): void {
        this.registerFormControl('Title', [<any>Validators.required]);
        this.registerFormControl('Url', [<any>Validators.required]);
        this.registerFormControl('ShortDescription', [
            <any>Validators.required
        ]);
        this.registerFormControl('Hashtag', [<any>Validators.required]);
        this.registerFormControl('Logo', [<any>Validators.required]);
        this.registerFormControl('LogoSmall', [<any>Validators.required]);
        this.registerFormControl('SiteIds', [<any>Validators.required]);
    }
}

export abstract class ContentFormComponent<
    TModel extends ISectionEntity,
    TSaveModel extends SaveModelResponse<TModel>
> extends SiteEntityFormComponent<TModel, TSaveModel> {
    protected get Sections(): Observable<BaseSection[]> {
        return this.servicesProvider.SectionsService.getAll(1, 1000, 'id').pipe(
            map(list => list.Data)
        );
    }

    protected get Tags(): Observable<Tag[]> {
        return this.servicesProvider.TagsService.getAll(1, 1000, 'id').pipe(
            map(list => list.Data)
        );
    }

    protected constructForm(): void {
        this.registerFormControl('Title', [<any>Validators.required]);
        this.registerFormControl('Url', [<any>Validators.required]);
        this.registerFormControl('SectionIds', [<any>Validators.required]);
        this.registerFormControl('TagIds', [<any>Validators.required]);
        this.constructorDataFrom();
    }

    protected abstract constructorDataFrom(): void;
}
