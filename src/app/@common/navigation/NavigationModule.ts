import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BioCommonModule } from 'bioengine.core.api.client';

import { NavigationCollapsableComponent } from './NavigationCollapsableComponent';
import { NavigationGroupComponent } from './NavigationGroupComponent';
import { NavigationItemComponent } from './NavigationItemComponent';
import { NavigationComponent } from './NavigationComponent';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
    imports: [BioCommonModule, RouterModule, MatRippleModule],
    exports: [NavigationComponent],
    declarations: [
        NavigationComponent,
        NavigationGroupComponent,
        NavigationItemComponent,
        NavigationCollapsableComponent
    ]
})
export class NavigationModule { }
