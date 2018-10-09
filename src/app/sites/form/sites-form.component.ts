import {FormComponent} from '../../@common/forms/FormComponent';
import {Site} from '../../@models/Site';
import {SaveSiteResponse} from '../../@models/results/Site';
import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {ServicesProvider} from '../../@services/ServicesProvider';
import {CustomValidators} from 'ng4-validators';
import {PageContext} from '../../@common/PageComponent';
import {BaseService} from '../../@common/BaseService';

@Component({
  moduleId: module.id,
  selector: 'siteForm',
  templateUrl: './site-form.component.html',
  providers: [
    PageContext
  ]
})
export class SitesFormComponent extends FormComponent<Site, SaveSiteResponse> implements OnInit {

  constructor(context: PageContext, servicesProvider: ServicesProvider) {
    super(context, servicesProvider);
  }

  protected constructForm() {
    this.registerFormControl('Title', [<any>Validators.required]);
    this.registerFormControl('Url', [<any>Validators.required, CustomValidators.url]);
  }

  protected getNewModelTitle(): string {
    return 'Создание сайта';
  }

  protected getService(): BaseService<Site> {
    return this.servicesProvider.SitesService;
  }

  protected getRoute(): string {
    return '/sites';
  }
}
