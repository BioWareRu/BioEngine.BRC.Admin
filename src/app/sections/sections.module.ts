import { NgModule } from '@angular/core';

import { BlocksModule } from '@common/blocks/blocks.module';
import { BioCommonModule } from '@common/BioCommonModule';
import { BioFormsModule } from '@common/forms/FormsModule';
import { DeveloperFormPageComponent } from './developers/form/form-page.component';
import { DeveloperFormComponent } from './developers/form/form.component';
import { GameFormPageComponent } from './games/form/form-page.component';
import { GameFormComponent } from './games/form/form.component';
import { SectionsListComponent } from './list/list.component';
import { SectionsRoutingModule } from './sections-routing.module';
import { TopicFormPageComponent } from './topics/form/form-page.component';
import { TopicFormComponent } from './topics/form/form.component';

@NgModule({
    imports: [BioCommonModule, BioFormsModule, SectionsRoutingModule, BlocksModule],
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
export class SectionsModule { }
