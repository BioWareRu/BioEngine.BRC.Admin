import { NgModule } from '@angular/core';
import { MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { BrcCommonModule } from '@common/BRCCommonModule';
import { ListTableComponent } from '@common/list/component/ListTableComponent';
import { SectionsLabelsListComponent } from '@common/list/component/SectionsLabelsListComponent';
import { SitesLabelsListComponent } from '@common/list/component/SitesLabelsListComponent';
import { TagsLabelsListComponent } from '@common/list/component/TagsLabelsListComponent';
import { BioCommonModule } from 'bioengine.core.api.client';

@NgModule({
    imports: [BioCommonModule, MatProgressSpinnerModule, MatTableModule, RouterModule, BrcCommonModule, MatSortModule, MatPaginatorModule],
    declarations: [ListTableComponent, SectionsLabelsListComponent, SitesLabelsListComponent, TagsLabelsListComponent],
    exports: [BioCommonModule, ListTableComponent]
})
export class BrcListModule {

}
