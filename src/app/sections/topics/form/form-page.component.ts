import { Component } from '@angular/core';
import { AbstractBaseService } from '@common/AbstractBaseService';
import { AbstractFormPageComponent } from '@common/forms/AbstractFormPageComponent';
import { PageContext } from '@common/PageContext';
import { Topic } from '@models/Topic';
import { TopicsService } from '@services/TopicsService';

@Component({
    selector: 'topic-form-page',
    template: `
        <topic-form class="model-form" #modelForm [model]="model"></topic-form>
    `,
    providers: [PageContext]
})
export class TopicFormPageComponent extends AbstractFormPageComponent<Topic, TopicsService> {
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
