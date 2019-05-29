import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BioSharedModule } from './../shared/BioSharedModule';

import { NavigationCollapsableComponent } from './collapsable.component';
import { NavigationGroupComponent } from './group.component';
import { NavigationItemComponent } from './item.component';
import { NavigationComponent } from './navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

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
export class NavigationModule { }
