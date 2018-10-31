import {NgModule} from '@angular/core';

import {SitesListComponent} from './list/list.component';
import {SitesRoutingModule} from './sites-routing.module';
import {BioCommonModule} from '../@common/BioCommonModule';
import {SitesFormComponent} from './form/sites-form.component';
import {BioFormsModule} from '../@common/forms/FormsModule';

const SITES_COMPONENTS = [
    SitesListComponent,
    SitesFormComponent
];

@NgModule({
    imports: [
        SitesRoutingModule,
        BioCommonModule,
        BioFormsModule
    ],
    declarations: [
        ...SITES_COMPONENTS,
    ],
})
export class SitesModule {
}
