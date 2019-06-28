import { NgModule } from '@angular/core';
import { BrcFormsModule } from '@common/forms/BrcFormsModule';
import { BrcListModule } from '@common/list/BrcListModule';
import { BioCommonModule } from 'bioengine.core.api.client';

import { SiteFormPageComponent } from './form/SiteFormPageComponent';
import { SitesFormComponent } from './form/SitesFormComponent';
import { SitesListComponent } from './list/SitesListComponent';
import { SitesRoutingModule } from './SitesRoutingModule';

const SITES_COMPONENTS = [
    SitesListComponent,
    SitesFormComponent,
    SiteFormPageComponent
];

@NgModule({
    imports: [SitesRoutingModule, BioCommonModule, BrcFormsModule, BrcListModule],
    declarations: [...SITES_COMPONENTS]
})
export class SitesModule {}
