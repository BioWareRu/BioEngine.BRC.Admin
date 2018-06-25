import {AbstractControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {HttpErrorResponse} from '@angular/common/http';
import {RestResult} from '../RestResult';
import {HostListener} from '@angular/core';
import {BioFormControl} from "./BioFormControl";
import {plainToClass} from "class-transformer";
import {Section} from "../../@models/Section";
import {Site} from "../../@models/Site";
import {ServicesProvider} from "../../@services/ServicesProvider";

export abstract class FormComponent<TModel, TResultModel> {
  public success = false;
  public hasErrors = false;
  public hasChanges = false;

  public isNew = false;

  public formLoaded = false;

  public formGroup: FormGroup;

  public model: TModel;

  initForm() {
    this.formGroup = new FormGroup(this.getFormGroupConfig());

    // noinspection TsLint
    for (const controlIndex in this.formGroup.controls) {
      if (!this.formGroup.controls.hasOwnProperty(controlIndex)) {
        continue;
      }
      this.updateControlValue(controlIndex, this.model[controlIndex]);
    }

    this.subscribeToFormChanges();

    this.formLoaded = true;
  }

  @HostListener('window:beforeunload', ['$event'])
  doSomething($event) {
    if (this.hasChanges) {
      $event.returnValue = 'Форма не была сохранена. Данные будут потеряны!';
    }
  }

  subscribeToFormChanges() {
    const myFormValueChanges$ = this.formGroup.valueChanges;

    myFormValueChanges$.subscribe(x => {
      const changes = {};
      for (const k in x) {
        if (!x.hasOwnProperty(k)) {
          continue;
        }
        if (this.model[k] !== x[k]) {
          this.hasChanges = true;
          this.hasErrors = false;
          this.success = false;
          const orig = this.model[k];
          this.model[k] = x[k];
          changes[k] = {
            old: orig,
            current: x[k]
          };
          (<BioFormControl>this.formGroup.controls[k]).ServerErrors = [];
        }
      }
      if (changes) {
        this.processChanges(changes);
      }
    });
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
      },
      e => {
        this.hasErrors = true;
        this.handleSubmitError(e);
      }
    );
  }

  protected abstract getFormGroupConfig(): { [key: string]: AbstractControl };

  protected abstract processSuccessSave(saveResult: TResultModel);

  protected abstract doAdd(): Observable<TResultModel>;

  protected abstract doUpdate(): Observable<TResultModel>;

  protected abstract processChanges(changes);

  protected updateControlValue(controlKey, value) {
    if (!this.formGroup.controls.hasOwnProperty(controlKey)) {
      return;
    }
    this.formGroup.controls[controlKey].setValue(value);
  }

  protected handleSubmitError(response: HttpErrorResponse) {
    if (response.status === 422) {
      const data: RestResult = plainToClass(RestResult, response.error as RestResult);
      data.Errors.forEach(error => {
        (<BioFormControl>this.formGroup.controls[
          error.Field
          ]).ServerErrors.push(error.Message);
        this.formGroup.controls[error.Field].setErrors({server: true});
      });
    }
  }

  protected afterInit() {
  }
}

export abstract class SectionFormComponent<TModel extends Section<any>,
  TSaveModel> extends FormComponent<TModel, TSaveModel> {
  private sites: Site[] = [];
  public sitesOptions: any[];

  protected constructor(protected serviceProvider: ServicesProvider) {
    super();
  }

  public compareSites(site1: Site, site2: Site) {
    return (
      site1 &&
      site2 &&
      site1.Id === site2.Id
    );
  }

  protected loadFormData() {
    this.serviceProvider.SitesService.getList(1, 100, 'id').subscribe(res => {
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
