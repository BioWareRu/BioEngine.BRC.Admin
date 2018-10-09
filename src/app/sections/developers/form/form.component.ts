import {Component, OnInit} from '@angular/core';
import {Developer} from '../../../@models/Developer';
import {SaveDeveloperResponse} from '../../../@models/results/Developer';
import {ServicesProvider} from '../../../@services/ServicesProvider';
import {SectionFormComponent} from '../../../@common/forms/FormComponent';
import {PageContext} from '../../../@common/PageComponent';
import {BaseService} from '../../../@common/BaseService';

@Component({
  moduleId: module.id,
  selector: 'developerForm',
  templateUrl: './form.component.html',
  providers: [
    PageContext
  ]
})
export class DeveloperFormComponent extends SectionFormComponent<Developer, SaveDeveloperResponse> implements OnInit {

  constructor(context: PageContext, servicesProvider: ServicesProvider) {
    super(context, servicesProvider);
  }

  protected getNewModelTitle(): string {
    return 'Создание разработчика';
  }

  protected getRoute(): string {
    return '/sections/developers';
  }

  protected getService(): BaseService<Developer> {
    return this.servicesProvider.DevelopersService;
  }
}
