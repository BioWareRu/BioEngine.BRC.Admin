import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatIconModule, MatRippleModule} from '@angular/material';

import {NavigationGroupComponent} from './group.component';
import {NavigationItemComponent} from './item.component';
import {NavigationCollapsableComponent} from './collapsable.component';
import {NavigationComponent} from './navigation.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,

        MatIconModule,
        MatRippleModule,
    ],
    exports: [
        NavigationComponent
    ],
    declarations: [
        NavigationComponent,
        NavigationGroupComponent,
        NavigationItemComponent,
        NavigationCollapsableComponent,
    ]
})
export class NavigationModule {
}
