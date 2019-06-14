import { Component, Input } from '@angular/core';
import { AbstractBaseService } from '@common/AbstractBaseService';
import { AbstractFormComponent } from '@common/forms/AbstractFormComponent';
import { AbstractEntity } from '@models/base/AbstractEntity';

@Component({
    selector: 'form-layout-content',
    templateUrl: './FormLayoutContentComponent.html',
    styles: [
        `
            button {
                margin-right: 8px;
            }
        `
    ]
})
export class FormLayoutContentComponent<TModel extends AbstractEntity, TService extends AbstractBaseService<TModel>> {
    @Input() public formComponent: AbstractFormComponent<TModel, TService>;
}
