import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrcCommonModule } from '@common/BRCCommonModule';
import { NavigationModule } from '@common/navigation/NavigationModule';
import { BioCommonModule } from 'bioengine.core.api.client';

import { ContentComponent } from './content/ContentComponent';
import { LayoutComponent } from './LayoutComponent';
import { LoadingBarComponent } from './LoadingBarComponent';
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
        BrowserModule,
        BioCommonModule,
        RouterModule,
        BrcCommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        NavigationModule,
        MatProgressBarModule
    ]
})
export class LayoutModule {

}
