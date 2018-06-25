import {NgModule} from '@angular/core';

import {SitesComponent} from './sites.component';
import {SitesListComponent} from './list/list.component';
import {SitesRoutingModule} from './sites-routing.module';
import {ThemeModule} from '../@theme/theme.module';
import {BioCommonModule} from '../@common/BioCommonModule';
import {SitesFormComponent} from "./form/sites-form.component";
import {BioFormsModule} from "../@common/forms/FormsModule";

const SITES_COMPONENTS = [
  SitesComponent,
  SitesListComponent,
  SitesFormComponent
];

@NgModule({
  imports: [
    SitesRoutingModule,
    ThemeModule,
    BioCommonModule,
    BioFormsModule
  ],
  declarations: [
    ...SITES_COMPONENTS,
  ],
})
export class SitesModule {
}
