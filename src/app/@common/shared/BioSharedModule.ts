import { NgModule } from '@angular/core';
import { IconComponent } from './icon/Icon';
import { MatIconModule } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [IconComponent],
    exports: [IconComponent],
    providers: [],
    imports: [MatIconModule, CommonModule]
})
export class BioSharedModule {}
