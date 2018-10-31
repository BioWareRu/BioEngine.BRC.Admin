import {NgModule} from '@angular/core';

import {ContentListComponent} from './list/list.component';
import {ContentRoutingModule} from './content-routing.module';
import {BioCommonModule} from '../@common/BioCommonModule';
import {PostFormComponent} from './posts/form/form.component';
import {BioFormsModule} from '../@common/forms/FormsModule';
import {GalleryFormComponent} from './gallery/form.component';
import {FilesFormComponent} from './files/form.component';

const CONTENT_COMPONENTS = [
  ContentListComponent,
  PostFormComponent,
  GalleryFormComponent,
  FilesFormComponent
];

@NgModule({
  imports: [
    ContentRoutingModule,
    BioCommonModule,
    BioFormsModule
  ],
  declarations: [
    ...CONTENT_COMPONENTS,
  ],
})
export class ContentModule {
}
