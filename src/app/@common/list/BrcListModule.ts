import { NgModule } from '@angular/core';
import { BioCommonModule, BioListsModule } from 'bioengine-angular';

@NgModule({
    imports: [BioCommonModule, BioListsModule],
    exports: [BioCommonModule, BioListsModule]
})
export class BrcListModule {

}
