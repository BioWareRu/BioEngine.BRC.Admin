import { NgModule } from '@angular/core';

import { BioCommonModule } from '../@common/BioCommonModule';
import { BioFormsModule } from '../@common/forms/FormsModule';
import { SectionsRoutingModule } from './sections-routing.module';
import { DeveloperFormComponent } from './developers/form/form.component';
import { SectionsListComponent } from './list/list.component';
import { GameFormComponent } from './games/form/form.component';
import { TopicFormComponent } from './topics/form/form.component';
import { DeveloperFormPageComponent } from './developers/form/form-page.component';
import { GameFormPageComponent } from './games/form/form-page.component';
import { TopicFormPageComponent } from './topics/form/form-page.component';

@NgModule({
    imports: [BioCommonModule, BioFormsModule, SectionsRoutingModule],
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
export class SectionsModule {}
