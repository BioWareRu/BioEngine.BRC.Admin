import { NgModule } from '@angular/core';

import { BioCommonModule } from '@common/BioCommonModule';
import { BioFormsModule } from '@common/forms/FormsModule';
import { SiteFormPageComponent } from './form/form-page.component';
import { SitesFormComponent } from './form/sites-form.component';
import { SitesListComponent } from './list/list.component';
import { SitesRoutingModule } from './sites-routing.module';

const SITES_COMPONENTS = [
    SitesListComponent,
    SitesFormComponent,
    SiteFormPageComponent
];

@NgModule({
    imports: [SitesRoutingModule, BioCommonModule, BioFormsModule],
    declarations: [...SITES_COMPONENTS]
})
export class SitesModule {}
