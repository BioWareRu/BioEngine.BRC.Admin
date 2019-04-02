import { Component } from '@angular/core';
import { AbstractBaseService } from '@common/abstract-base-service';
import { AbstractFormPageComponent } from '@common/forms/abstract-form-component';
import { PageContext } from '@common/abstract-page-component';
import { SaveTopicResponse } from '@models/results/Topic';
import { Topic } from '@models/Topic';
import { TopicsService } from '@services/TopicsService';

@Component({
    selector: 'topic-form-page',
    template: `
        <topic-form class="model-form" #modelForm [model]="model"></topic-form>
    `,
    providers: [PageContext]
})
export class TopicFormPageComponent extends AbstractFormPageComponent<
    Topic,
    SaveTopicResponse
> {
    constructor(protected _topicsService: TopicsService, context: PageContext) {
        super(context);
    }

    protected _getNewModelTitle(): string {
        return 'Создание темы';
    }

    protected _getRoute(): string {
        return '/sections/topics';
    }

    protected _getService(): AbstractBaseService<Topic> {
        return this._topicsService;
    }
}
