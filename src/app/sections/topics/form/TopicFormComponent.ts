import { Component } from '@angular/core';
import { Topic } from '@models/Topic';
import { TopicsService } from '@services/TopicsService';
import { AbstractSectionFormComponent, DialogService, PropertiesService, SitesService, SnackBarService } from 'bioengine.core.api.client';

@Component({
    selector: 'topic-form',
    templateUrl: './TopicFormComponent.html'
})
export class TopicFormComponent extends AbstractSectionFormComponent<Topic, TopicsService> {
    constructor(
        public sitesService: SitesService,
        dialogService: DialogService,
        snackBarService: SnackBarService,
        propertiesService: PropertiesService,
        topicsService: TopicsService
    ) {
        super(
            dialogService,
            propertiesService,
            snackBarService,
            topicsService
        );
    }
}
