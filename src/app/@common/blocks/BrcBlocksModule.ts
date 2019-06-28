import { NgModule } from '@angular/core';
import { TwitchBlockFormComponent } from '@common/blocks/editor/TwitchBlockFormComponent';
import { BioBlocksModule } from 'bioengine-angular';

@NgModule({
    imports: [BioBlocksModule],
    exports: [BioBlocksModule],
    declarations: [
        TwitchBlockFormComponent
    ],
    entryComponents: [
        TwitchBlockFormComponent
    ]
})
export class BrcBlocksModule {

}
