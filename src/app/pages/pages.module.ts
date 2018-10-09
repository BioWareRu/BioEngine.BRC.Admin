import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../@theme/theme.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {TagsListComponent} from './tags/list.component';
import {BioCommonModule} from '../@common/BioCommonModule';
import {PagesListComponent} from './pages/list.component';
import {PageFormComponent} from './pages/form.component';
import {BioFormsModule} from '../@common/forms/FormsModule';

const PAGES_COMPONENTS = [
  PagesComponent,
  TagsListComponent,
  PagesListComponent,
  PageFormComponent
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    BioCommonModule,
    BioFormsModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
