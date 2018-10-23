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
import {MenuListComponent} from './menu/list.component';
import {MenuFormComponent} from './menu/form.component';
import {TreeModule} from 'angular-tree-component';
import {MenuItemFormComponent, MenuItemFormDialogComponent} from './menu/menuItemForm.component';
import {NbContextMenuModule, NbDialogModule} from '@nebular/theme';

const PAGES_COMPONENTS = [
  PagesComponent,
  TagsListComponent,
  PagesListComponent,
  PageFormComponent,
  MenuListComponent,
  MenuFormComponent,
  MenuItemFormComponent,
  MenuItemFormDialogComponent
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    BioCommonModule,
    BioFormsModule,
    TreeModule,
    NbDialogModule.forChild(),
    NbContextMenuModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  entryComponents: [
    MenuItemFormDialogComponent
  ]
})
export class PagesModule {
}
