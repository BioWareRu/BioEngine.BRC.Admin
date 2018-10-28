import {NgModule} from '@angular/core';
import {LayoutComponent} from './layout.component';
import {BioCommonModule} from '../@common/BioCommonModule';
import {MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {NavigationModule} from '../@common/navigation/navigation.module';

import {ContentComponent} from './content/content.component';


@NgModule({
    declarations: [
        LayoutComponent,
        ContentComponent
    ],
    exports: [
        LayoutComponent
    ],
    imports: [
        BioCommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        NavigationModule
    ]
})
export class LayoutModule {

}
