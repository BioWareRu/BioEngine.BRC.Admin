import { NgModule } from '@angular/core';
import { BioCommonModule } from '@common/BioCommonModule';
import { NavigationModule } from '@common/navigation/navigation.module';

import { ContentComponent } from './content/content.component';
import { LayoutComponent } from './layout.component';
import { LoadingBarComponent } from './loading-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
