import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {HttpErrorResponse} from '@angular/common/http';
import {RestResult} from '../RestResult';
import {HostListener} from '@angular/core';
import {BioFormControl} from "./BioFormControl";
import {plainToClass} from "class-transformer";
import {BaseSection} from "../../@models/Section";
import {Site} from "../../@models/Site";
import {ServicesProvider} from "../../@services/ServicesProvider";
import {ISiteEntity} from "../../@models/interfaces/ISiteEntity";
import {ISectionEntity} from "../../@models/interfaces/ISectionEntity";
import {AbstractControlOptions} from "@angular/forms/src/model";
import {ValidatorFn} from "@angular/forms/src/directives/validators";
import {PageComponent, PageContext} from "../PageComponent";
import {Utils} from "../Utils";
import {Tag} from "../../@models/Tag";
import {SaveModelResponse} from "../SaveModelResponse";

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
      const data: RestResult = plainToClass(RestResult, response.error as RestResult);
      data.Errors.forEach(error => {
        const control = this.controlsByProperty[error.Field];
        control.ServerErrors.push(error.Message);
        control.setErrors({server: true});
      });
      this.ToastsService.error("Ошибка валидации", "Произошла ошибка валидации, проверьте заполнение формы");
    }
  }

  protected afterInit() {
  }
}

export abstract class FormComponent<TModel, TResultModel> extends BaseFormComponent {
  public model: TModel;

  registerFormControl(name: string, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, property: string = null) {
    if (property == null) property = name;
    this.controls[name] = this.controlsByProperty[property] = new BioFormControl(<BaseFormComponent>this, name, this.model, property, validatorOrOpts);
  }

  updateControlValue(name: string) {
    this.controls[name].reloadValue();
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
        this.ToastsService.success("Успех!", "Сохранение прошло успешно.")
      },
      e => {
        this.hasErrors = true;
        this.handleSubmitError(e);
      }
    );
  }

  protected abstract processSuccessSave(saveResult: TResultModel);

  protected abstract doAdd(): Observable<TResultModel>;

  protected abstract doUpdate(): Observable<TResultModel>;
}

export abstract class SectionFormComponent<TModel extends ISiteEntity,
  TSaveModel> extends FormComponent<TModel, TSaveModel> {
  private sites: Site[] = [];
  public sitesOptions: any[];


  protected constructor(context: PageContext, protected servicesProvider: ServicesProvider) {
    super(context);
  }

  protected loadFormData() {
    this.servicesProvider.SitesService.getAll(1, 100, 'id').subscribe(res => {
      this.sites = res.Data;
      this.buildSitesOptions();
      this.initForm();
      this.afterInit();
    });
  }

  private buildSitesOptions() {
    this.sitesOptions = [];
    this.sites.forEach(site => {
      this.sitesOptions.push({value: site.Id, display: site.Title});
    });
    if (this.model.SiteIds) {
      this.model.Sites = [];
      this.model.SiteIds.forEach(id => {
        this.sites.forEach(site => {
          if (site.Id == id) {
            this.model.Sites.push({value: id, display: site.Title});
          }
        });
      })
    }
  }


  public save() {
    if (this.model.Sites) {
      this.model.SiteIds = [];
      this.model.Sites.forEach(site => {
        this.model.SiteIds.push(site.value);
      })
    }
    super.save();
  }
}

export abstract class ContentFormComponent<TModel extends ISectionEntity,
  TSaveModel> extends SectionFormComponent<TModel, TSaveModel> {
  private sections: BaseSection[] = [];
  public sectionsOptions: any[];

  private tags: Tag[] = [];
  public tagsOptions: any[];

  protected loadFormData() {
    Observable.forkJoin(
      this.servicesProvider.SectionsService.getAll(1, 1000, 'id'),
      this.servicesProvider.TagsService.getAll(1, 1000, 'id')
    ).subscribe(res => {
      this.sections = res[0].Data;
      this.tags = res[1].Data;
      this.buildSectionsOptions();
      this.buildTagsOptions();
      super.loadFormData();
    });
  }

  private buildSectionsOptions() {
    this.sectionsOptions = [];
    this.sections.forEach(section => {
      this.sectionsOptions.push({value: section.Id, display: section.Title});
    });
    if (this.model.SectionIds) {
      this.model.Sections = [];
      this.model.SectionIds.forEach(id => {
        this.sections.forEach(section => {
          if (section.Id == id) {
            this.model.Sections.push({value: id, display: section.Title});
          }
        });
      })
    }
  }

  private buildTagsOptions() {
    this.tagsOptions = [];
    this.tags.forEach(tag => {
      this.tagsOptions.push(tag.Name);
    });
    if (this.model.TagIds) {
      this.model.Tags = [];
      this.model.TagIds.forEach(id => {
        this.tags.forEach(tag => {
          if (tag.Id == id) {
            this.model.Tags.push(tag.Name);
          }
        });
      })
    }
  }

  public save() {
    if (this.model.Sections) {
      this.model.SectionIds = [];
      this.model.Sections.forEach(section => {
        this.model.SectionIds.push(section.value);
      })
    }
    let canSave = true;
    if (this.model.Tags) {
      this.model.TagIds = [];

      const toSave: Observable<SaveModelResponse<Tag>>[] = [];
      this.model.Tags.forEach(tag => {
        if (typeof tag === 'object') {
          const newTag = new Tag();
          newTag.Name = tag.display;
          toSave.push(this.servicesProvider.TagsService.add(newTag));
        }
        else {
          this.tags.forEach(tagModel => {
            if (tagModel.Name == tag) {
              this.model.TagIds.push(tagModel.Id);
            }
          });
        }
      });
      if (toSave.length > 0) {
        canSave = false;
        Observable.forkJoin(toSave).subscribe(data => {
          for (let result of data) {
            this.model.TagIds.push(result.Model.Id);
            this.tags.push(result.Model);
            this.buildTagsOptions();
          }
          super.save();
        });
      }
    }
    if (canSave) {
      super.save();
    }
  }

  public processChange(key: string, oldValue: any, newValue: any) {
    if (key == 'Title') {
      const origSlug = Utils.slugifyUrl(oldValue);
      if (!this.model.Url || origSlug === this.model.Url) {
        this.model.Url = Utils.slugifyUrl(newValue);
        this.updateControlValue("Url");
      }
      this.StateService.setTitle(this.model.Title);
    }
  }
}
