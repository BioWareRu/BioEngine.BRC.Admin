import { NgModule } from '@angular/core';

import { BioCommonModule } from '@common/BioCommonModule';
import { StorageManagerPageComponent } from './page/StorageManagerPageComponent';
import { StorageRoutingModule } from './storage-routing.module';

const STORAGE_COMPONENTS = [StorageManagerPageComponent];

@NgModule({
    imports: [StorageRoutingModule, BioCommonModule],
    declarations: [...STORAGE_COMPONENTS]
})
export class StorageModule {}
