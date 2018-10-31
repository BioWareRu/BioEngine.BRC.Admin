import {NgModule} from '@angular/core';
import {LayoutComponent} from './layout.component';
import {BioCommonModule} from '../@common/BioCommonModule';
import {MatListModule, MatProgressBarModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {NavigationModule} from '../@common/navigation/navigation.module';

import {ContentComponent} from './content/content.component';
import {LoadingBarComponent} from './loading-bar.component';


@NgModule({
    declarations: [
        LayoutComponent,
        ContentComponent,
        LoadingBarComponent
    ],
    exports: [
        LayoutComponent
    ],
    imports: [
        BioCommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        NavigationModule,
        MatProgressBarModule
    ]
})
export class LayoutModule {

}
