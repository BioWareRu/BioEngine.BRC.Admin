import { NgModule } from '@angular/core';
import { MatListModule, MatProgressBarModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { BioCommonModule } from '@common/BioCommonModule';
import { NavigationModule } from '@common/navigation/navigation.module';

import { ContentComponent } from './content/content.component';
import { LayoutComponent } from './layout.component';
import { LoadingBarComponent } from './loading-bar.component';

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
