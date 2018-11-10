import { FormPageComponent } from 'app/@common/forms/FormComponent';
import { BaseService } from 'app/@common/BaseService';
import { PageContext } from 'app/@common/PageComponent';
import { Component } from '@angular/core';
import { TopicsService } from 'app/@services/TopicsService';
import { Topic } from 'app/@models/Topic';
import { SaveTopicResponse } from 'app/@models/results/Topic';

@Component({
    selector: 'topic-form-page',
    template: `
        <topic-form class="model-form" #modelForm [model]="Model"></topic-form>
    `,
    providers: [PageContext]
})
export class TopicFormPageComponent extends FormPageComponent<
    Topic,
    SaveTopicResponse
> {
    constructor(context: PageContext, protected topicsService: TopicsService) {
        super(context);
    }

    protected getNewModelTitle(): string {
        return 'Создание темы';
    }

    protected getRoute(): string {
        return '/sections/topics';
    }

    protected getService(): BaseService<Topic> {
        return this.topicsService;
    }
}
