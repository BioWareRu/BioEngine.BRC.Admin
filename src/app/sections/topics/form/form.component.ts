import {Component, OnInit} from '@angular/core';
import {ServicesProvider} from '../../../@services/ServicesProvider';
import {SectionFormComponent} from '../../../@common/forms/FormComponent';
import {PageContext} from '../../../@common/PageComponent';
import {SaveTopicResponse} from '../../../@models/results/Topic';
import {Topic} from '../../../@models/Topic';
import {BaseService} from '../../../@common/BaseService';

@Component({
  moduleId: module.id,
  selector: 'topicForm',
  templateUrl: './form.component.html',
  providers: [
    PageContext
  ]
})
export class TopicFormComponent extends SectionFormComponent<Topic, SaveTopicResponse> implements OnInit {

  constructor(context: PageContext, servicesProvider: ServicesProvider) {
    super(context, servicesProvider);
  }

  protected getNewModelTitle(): string {
    return 'Создание темы';
  }

  protected getRoute(): string {
    return '/sections/topics';
  }

  protected getService(): BaseService<Topic> {
    return this.servicesProvider.TopicsService;
  }


}
