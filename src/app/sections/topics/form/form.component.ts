import { Component } from '@angular/core';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { AbstractSectionFormComponent } from "@common/forms/AbstractSectionFormComponent";
import { SaveTopicResponse } from "@models/results/SaveTopicResponse";
import { Topic } from '@models/Topic';
import { ServicesProvider } from '@services/ServicesProvider';

@Component({
    selector: 'topic-form',
    templateUrl: './form.component.html'
})
export class TopicFormComponent extends AbstractSectionFormComponent<Topic,
    SaveTopicResponse> {
    constructor(
        snackBarService: SnackBarService,
        servicesProvider: ServicesProvider
    ) {
        super(
            servicesProvider,
            servicesProvider.topicsService,
            snackBarService
        );
    }
}
