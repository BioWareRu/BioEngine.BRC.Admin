import {NgModule} from '@angular/core';

import {ThemeModule} from '../@theme/theme.module';
import {BioCommonModule} from '../@common/BioCommonModule';
import {BioFormsModule} from "../@common/forms/FormsModule";
import {SectionsComponent} from "./sections.component";
import {SectionsRoutingModule} from "./sections-routing.module";
import {DeveloperFormComponent} from "./developers/form/form.component";
import {SectionsListComponent} from "./list/list.component";

const SECTIONS_COMPONENTS = [
  SectionsComponent,
  DeveloperFormComponent,
  SectionsListComponent,
];

@NgModule({
  imports: [
    ThemeModule,
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
