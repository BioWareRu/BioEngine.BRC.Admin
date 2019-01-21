import { NgModule } from '@angular/core';

import { BioCommonModule } from '../@common/BioCommonModule';
import { StorageRoutingModule } from './storage-routing.module';
import { StorageManagerPageComponent } from './page/StorageManagerPageComponent';

const STORAGE_COMPONENTS = [StorageManagerPageComponent];

@NgModule({
    imports: [StorageRoutingModule, BioCommonModule],
    declarations: [...STORAGE_COMPONENTS]
})
export class StorageModule {}
