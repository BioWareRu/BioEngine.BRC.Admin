import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconComponent } from './icon/IconComponent';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [IconComponent],
    exports: [IconComponent],
    providers: [],
    imports: [MatIconModule, CommonModule]
})
export class BioSharedModule { }
