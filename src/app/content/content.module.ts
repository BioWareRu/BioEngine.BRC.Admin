import { NgModule } from '@angular/core';

import { ContentListComponent } from './list/list.component';
import { ContentRoutingModule } from './content-routing.module';
import { BioCommonModule } from '../@common/BioCommonModule';
import { PostFormComponent } from './posts/form/form.component';
import { BioFormsModule } from '../@common/forms/FormsModule';
import { TextBlockFormComponent } from './posts/form/textblock-form.component';
import { GalleryBlockFormComponent } from './posts/form/galleryblock-form.component';
import { FileBlockFormComponent } from './posts/form/fileblock-form.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PostFormPageComponent } from './posts/form/form-page.component';
@NgModule({
    imports: [
        ContentRoutingModule,
        BioCommonModule,
        BioFormsModule,
        DragDropModule
    ],
    declarations: [
        ContentListComponent,
        PostFormComponent,
        TextBlockFormComponent,
        GalleryBlockFormComponent,
        FileBlockFormComponent,
        PostFormPageComponent
    ]
})
export class ContentModule {}
