import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { BioCommonModule } from '@common/BioCommonModule';
import { TagsListComponent } from './list.component';

const routes: Routes = [{
    path: '',
    component: TagsListComponent
}];

@NgModule({
    imports: [
        BioCommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        TagsListComponent
    ]
})
export class TagsModule {
}
