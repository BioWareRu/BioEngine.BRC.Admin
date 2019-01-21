import { NgModule } from '@angular/core';

import { ContentListComponent } from './list/list.component';
import { PostsRoutingModule } from './posts-routing.module';
import { BioCommonModule } from '../@common/BioCommonModule';
import { BioFormsModule } from '../@common/forms/FormsModule';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PostFormComponent } from './form/form.component';
import { TextBlockFormComponent } from './form/textblock-form.component';
import { GalleryBlockFormComponent } from './form/galleryblock-form.component';
import { FileBlockFormComponent } from './form/fileblock-form.component';
import { PostFormPageComponent } from './form/form-page.component';
import { MatSidenavModule } from '@angular/material';
@NgModule({
    imports: [
        PostsRoutingModule,
        BioCommonModule,
        BioFormsModule,
        DragDropModule,
        MatSidenavModule
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
export class PostsModule {}
