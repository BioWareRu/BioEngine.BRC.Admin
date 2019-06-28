import { NgModule } from '@angular/core';
import { BioCommonModule, BioStorageModule } from 'bioengine.core.api.client';

import { StorageManagerPageComponent } from './page/StorageManagerPageComponent';
import { StorageRoutingModule } from './StorageRoutingModule';

const STORAGE_COMPONENTS = [StorageManagerPageComponent];

@NgModule({
    imports: [StorageRoutingModule, BioCommonModule, BioStorageModule],
    declarations: [...STORAGE_COMPONENTS]
})
export class StorageModule {
}
