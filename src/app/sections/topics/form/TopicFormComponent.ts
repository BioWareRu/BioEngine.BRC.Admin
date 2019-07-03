import { Component } from '@angular/core';
import { AbstractBrcSectionFormComponent } from '@common/forms/AbstractBrcSectionFormComponent';
import { Topic } from '@models/Topic';
import { TopicData } from '@models/TopicData';
import { TopicsService } from '@services/TopicsService';
import { DialogService, PropertiesService, SitesService, SnackBarService } from 'bioengine-angular';

@Component({
    selector: 'topic-form',
    templateUrl: './TopicFormComponent.html'
})
export class TopicFormComponent extends AbstractBrcSectionFormComponent<Topic, TopicData, TopicsService> {
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
