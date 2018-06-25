import {NgModule} from '@angular/core';

import {ContentComponent} from './content.component';
import {ContentListComponent} from './list/list.component';
import {ContentRoutingModule} from './content-routing.module';
import {ThemeModule} from '../@theme/theme.module';
import {BioCommonModule} from '../@common/BioCommonModule';

const CONTENT_COMPONENTS = [
  ContentComponent,
  ContentListComponent,
];

@NgModule({
  imports: [
    ContentRoutingModule,
    ThemeModule,
    BioCommonModule,
  ],
  declarations: [
    ...CONTENT_COMPONENTS,
  ],
})
export class ContentModule {
}
