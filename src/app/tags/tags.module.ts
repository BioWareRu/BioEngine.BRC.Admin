import {NgModule} from '@angular/core';

import {TagsListComponent} from './list.component';
import {BioCommonModule} from '../@common/BioCommonModule';
import {RouterModule, Routes} from '@angular/router';

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
