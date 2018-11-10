import { Component, OnInit } from '@angular/core';
import { ServicesProvider } from '../../../@services/ServicesProvider';
import { SectionFormComponent } from '../../../@common/forms/FormComponent';
import { SaveTopicResponse } from '../../../@models/results/Topic';
import { Topic } from '../../../@models/Topic';
import { BaseService } from '../../../@common/BaseService';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';

@Component({
    selector: 'topic-form',
    templateUrl: './form.component.html'
})
export class TopicFormComponent extends SectionFormComponent<
    Topic,
    SaveTopicResponse
> {
    constructor(
        snackBarService: SnackBarService,
        servicesProvider: ServicesProvider
    ) {
        super(
            servicesProvider,
            snackBarService,
            servicesProvider.TopicsService
        );
    }
}
