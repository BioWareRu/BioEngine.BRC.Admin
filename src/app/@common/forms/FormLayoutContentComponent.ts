import { Component, Input } from '@angular/core';
import { AbstractFormComponent } from '@common/forms/abstract-form-component';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { AbstractModel } from '@models/base/abstract-model';

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
export class FormLayoutContentComponent<TModel extends AbstractModel,
    TResultModel extends SaveModelResponse<TModel>> {
    @Input() public formComponent: AbstractFormComponent<TModel, TResultModel>;
}
