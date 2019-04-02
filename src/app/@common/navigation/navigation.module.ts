import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatRippleModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { BioSharedModule } from './../shared/BioSharedModule';

import { NavigationCollapsableComponent } from './collapsable.component';
import { NavigationGroupComponent } from './group.component';
import { NavigationItemComponent } from './item.component';
import { NavigationComponent } from './navigation.component';

@NgModule({
    imports: [CommonModule, RouterModule, MatIconModule, MatRippleModule, BioSharedModule],
    exports: [NavigationComponent],
    declarations: [
        NavigationComponent,
        NavigationGroupComponent,
        NavigationItemComponent,
        NavigationCollapsableComponent
    ]
})
export class NavigationModule {}
