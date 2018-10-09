import {FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {HttpErrorResponse} from '@angular/common/http';
import {RestResult} from '../RestResult';
import {HostListener, OnInit} from '@angular/core';
import {BioFormControl} from './BioFormControl';
import {plainToClass} from 'class-transformer';
import {ServicesProvider} from '../../@services/ServicesProvider';
import {ISiteEntity} from '../../@models/interfaces/ISiteEntity';
import {ISectionEntity} from '../../@models/interfaces/ISectionEntity';
import {AbstractControlOptions} from '@angular/forms/src/model';
import {ValidatorFn} from '@angular/forms/src/directives/validators';
import {PageComponent, PageContext} from '../PageComponent';
import {Utils} from '../Utils';
import {SaveModelResponse} from '../SaveModelResponse';
import {BaseService} from '../BaseService';
import {map} from 'rxjs/operators';
import {Model} from '../../@models/base/Model';
import {Settings, SettingType} from '../../@models/base/Settings';

export abstract class BaseFormComponent extends PageComponent {
  public success = false;
  public hasErrors = false;
  public hasChanges = false;

  public isNew = false;

  public formLoaded = false;

  public formGroup: FormGroup;

  initForm() {
    this.constructForm();
    this.formGroup = new FormGroup(this.controls);
    this.formLoaded = true;
  }

  protected abstract constructForm();

  @HostListener('window:beforeunload', ['$event'])
  checkChanges($event) {
    if (this.hasChanges) {
      $event.returnValue = 'Форма не была сохранена. Данные будут потеряны!';
    }
  }

  protected controls: { [p: string]: BioFormControl } = {};
  protected controlsByProperty: { [p: string]: BioFormControl } = {};

  public registerChange(key: string, oldValue: any, newValue: any) {
    this.hasChanges = true;
    this.hasErrors = false;
    this.success = false;
    this.processChange(key, oldValue, newValue);
  }

  public processChange(key: string, oldValue: any, newValue: any) {
  }

  protected handleSubmitError(response: HttpErrorResponse) {
    if (response.status === 422) {
      const data: RestResult = plainToClass(
        RestResult,
        response.error as RestResult
      );
      data.Errors.forEach(error => {
        const control = this.controlsByProperty[error.Field];
        control.ServerErrors.push(error.Message);
        control.setErrors({server: true});
      });
      this.ToastsService.error(
        'Ошибка валидации',
        'Произошла ошибка валидации, проверьте заполнение формы'
      );
    }
  }

  protected afterInit() {
  }
}

export abstract class FormComponent<TModel extends Model,
  TResultModel extends SaveModelResponse<TModel>> extends BaseFormComponent implements OnInit {
  public model: TModel;
  public SettingTypes = SettingType;
  public ModelSettings: Settings[] = [];
  protected modelId: number;
  protected isPublished: boolean;

  protected constructor(
    context: PageContext,
    protected servicesProvider: ServicesProvider
  ) {
    super(context);
  }

  constructSettingsForm(): any {
    if (this.model.SettingsGroups) {
      this.model.SettingsGroups.forEach((settingsGroup, groupIndex) => {
        if (!settingsGroup.IsEditable) return;
        settingsGroup.Properties.forEach((prop, propIndex) => {
          this.registerFormControl(
            settingsGroup.Key + prop.Key,
            [<any>Validators.required],
            `SettingsGroups.${groupIndex}.Properties.${propIndex}.Value`
          );
        });
        this.ModelSettings.push(settingsGroup);
      });
    }
  }

  public SettingsOptions(groupKey: string, propertyKey: string) {
    return this.servicesProvider.SettingsService.getOptions(
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
            this.StateService.setTitle(model.Title);
            this.loadFormData();
          });
      } else {
        this.isNew = true;
        this.getService()
          .new()
          .subscribe(model => {
            this.model = model;
            this.StateService.setTitle(this.getNewModelTitle());
            this.loadFormData();
          });
      }
    });
  }

  registerFormControl(
    name: string,
    validatorOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    property: string = null
  ) {
    if (property == null) property = name;
    this.controls[name] = this.controlsByProperty[
      property
      ] = new BioFormControl(
      <BaseFormComponent>this,
      name,
      this.model,
      property,
      validatorOrOpts
    );
  }

  public save() {
    this.success = false;
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
        this.ToastsService.success('Успех!', 'Сохранение прошло успешно.');
      },
      e => {
        this.hasErrors = true;
        this.handleSubmitError(e);
      }
    );
  }

  protected doAdd(): Observable<SaveModelResponse<TModel>> {
    return this.getService().add(this.model);
  }

  protected doUpdate(): Observable<SaveModelResponse<TModel>> {
    return this.getService().update(this.modelId, this.model);
  }

  protected loadFormData() {
    this.constructSettingsForm();
    this.initForm();
    this.afterInit();
  }

  protected abstract getNewModelTitle(): string;

  updateControlValue(name: string) {
    this.controls[name].reloadValue();
  }

  protected abstract getService(): BaseService<TModel>;

  protected processSuccessSave(saveResult: SaveModelResponse<TModel>) {
    if (!this.modelId) {
      this.Router.navigate([this.getRoute(), saveResult.Model.Id, 'edit']);
    }
  }

  protected abstract getRoute(): string;
}

export abstract class SiteEntityFormComponent<TModel extends ISiteEntity,
  TSaveModel extends SaveModelResponse<TModel>> extends FormComponent<TModel, TSaveModel> {
  protected get Sites() {
    return this.servicesProvider.SitesService.getAll(1, 1000, 'id');
  }
}

export abstract class SectionFormComponent<TModel extends ISiteEntity,
  TSaveModel extends SaveModelResponse<TModel>> extends SiteEntityFormComponent<TModel, TSaveModel> {
  public processChange(key: string, oldValue: any, newValue: any) {
    if (key === 'Title') {
      const origSlug = Utils.slugifyUrl(oldValue);
      if (!this.model.Url || origSlug === this.model.Url) {
        this.model.Url = Utils.slugifyUrl(newValue);
        this.updateControlValue('Url');
      }
      this.StateService.setTitle(this.model.Title);
    }
  }

  protected constructForm() {
    this.registerFormControl('Title', [<any>Validators.required]);
    this.registerFormControl('Url', [<any>Validators.required]);
    this.registerFormControl('ShortDescription', [<any>Validators.required]);
    this.registerFormControl('Hashtag', [<any>Validators.required]);
    this.registerFormControl('Logo', [<any>Validators.required]);
    this.registerFormControl('LogoSmall', [<any>Validators.required]);
    this.registerFormControl('SiteIds', [<any>Validators.required]);
  }
}

export abstract class ContentFormComponent<TModel extends ISectionEntity,
  TSaveModel extends SaveModelResponse<TModel>> extends SiteEntityFormComponent<TModel, TSaveModel> {
  protected get Sections() {
    return this.servicesProvider.SectionsService.getAll(1, 1000, 'id');
  }

  protected get Tags() {
    return this.servicesProvider.TagsService.getAll(1, 1000, 'id');
  }

  protected constructForm() {
    this.registerFormControl('Title', [<any>Validators.required]);
    this.registerFormControl('Url', [<any>Validators.required]);
    this.registerFormControl('Description', [<any>Validators.required]);
    this.registerFormControl('SectionIds', [<any>Validators.required]);
    this.registerFormControl('TagIds', [<any>Validators.required]);
    this.constructorDataFrom();
  }

  protected abstract constructorDataFrom();
}
