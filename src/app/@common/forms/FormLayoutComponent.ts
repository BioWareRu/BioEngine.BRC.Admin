import { Component, Input } from '@angular/core';
import { AbstractModel } from '@models/base/abstract-model';
import { SaveModelResponse } from '../SaveModelResponse';
import { AbstractFormComponent } from './abstract-form-component';

@Component({
    selector: 'form-layout',
    templateUrl: './FormLayoutComponent.html',
    styles: [
        `
            button {
                margin-right: 8px;
            }
        `
    ]
})
export class FormLayoutComponent<
    TModel extends AbstractModel,
    TResultModel extends SaveModelResponse<TModel>
> {
    @Input() public formComponent: AbstractFormComponent<TModel, TResultModel>;
    public objectKeys = Object.keys;

    public save(): void {
        this.formComponent.save();
    }
}
