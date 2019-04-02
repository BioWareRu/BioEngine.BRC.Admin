import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { IconComponent } from './icon/Icon';

@NgModule({
    declarations: [IconComponent],
    exports: [IconComponent],
    providers: [],
    imports: [MatIconModule, CommonModule]
})
export class BioSharedModule {}
