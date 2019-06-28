import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { BrcListModule } from '@common/list/BrcListModule';
import { TagsListComponent } from './TagsListComponent';

const routes: Routes = [{
    path: '',
    component: TagsListComponent
}];

@NgModule({
    imports: [
        BrcListModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        TagsListComponent
    ]
})
export class TagsModule {
}
