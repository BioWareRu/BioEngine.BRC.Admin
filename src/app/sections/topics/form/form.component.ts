import { Component } from '@angular/core';
import { DialogService } from '@common/modals/DialogService';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { AbstractSectionFormComponent } from '@common/forms/AbstractSectionFormComponent';
import { Topic } from '@models/Topic';
import { ServicesProvider } from '@services/ServicesProvider';
import { TopicsService } from '@services/TopicsService';

@Component({
    selector: 'topic-form',
    templateUrl: './form.component.html'
})
export class TopicFormComponent extends AbstractSectionFormComponent<Topic, TopicsService> {
    constructor(
        dialogService: DialogService,
        snackBarService: SnackBarService,
        servicesProvider: ServicesProvider
    ) {
        super(
            dialogService,
            servicesProvider,
            snackBarService,
            servicesProvider.topicsService
        );
    }
}
