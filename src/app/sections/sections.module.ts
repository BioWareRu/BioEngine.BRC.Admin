import {NgModule} from '@angular/core';

import {BioCommonModule} from '../@common/BioCommonModule';
import {BioFormsModule} from '../@common/forms/FormsModule';
import {SectionsRoutingModule} from './sections-routing.module';
import {DeveloperFormComponent} from './developers/form/form.component';
import {SectionsListComponent} from './list/list.component';
import {GameFormComponent} from './games/form/form.component';
import {TopicFormComponent} from './topics/form/form.component';

const SECTIONS_COMPONENTS = [
  DeveloperFormComponent,
  SectionsListComponent,
  GameFormComponent,
  TopicFormComponent
];

@NgModule({
  imports: [
    BioCommonModule,
    BioFormsModule,
    SectionsRoutingModule,
  ],
  declarations: [
    ...SECTIONS_COMPONENTS,
  ],
})
export class SectionsModule {
}
