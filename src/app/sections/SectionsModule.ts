import { NgModule } from '@angular/core';
import { BrcBlocksModule } from '@common/blocks/BrcBlocksModule';
import { BrcFormsModule } from '@common/forms/BrcFormsModule';
import { BrcListModule } from '@common/list/BrcListModule';
import { BioCommonModule } from 'bioengine-angular';

import { DeveloperFormPageComponent } from './developers/form/DeveloperFormPageComponent';
import { DeveloperFormComponent } from './developers/form/DeveloperFormComponent';
import { GameFormPageComponent } from './games/form/GameFormPageComponent';
import { GameFormComponent } from './games/form/GameFormComponent';
import { SectionsListComponent } from './list/SectionsListComponent';
import { SectionsRoutingModule } from './SectionsRoutingModule';
import { TopicFormPageComponent } from './topics/form/TopicFormPageComponent';
import { TopicFormComponent } from './topics/form/TopicFormComponent';

@NgModule({
    imports: [BioCommonModule, BrcFormsModule, SectionsRoutingModule, BrcListModule, BrcBlocksModule],
    declarations: [
        DeveloperFormComponent,
        SectionsListComponent,
        GameFormComponent,
        TopicFormComponent,
        DeveloperFormPageComponent,
        GameFormPageComponent,
        TopicFormPageComponent
    ]
})
export class SectionsModule {
}
