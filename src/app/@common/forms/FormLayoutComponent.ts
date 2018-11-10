import { Component, Input } from '@angular/core';
import { FormComponent } from './FormComponent';
import { Model } from '../../@models/base/Model';
import { SaveModelResponse } from '../SaveModelResponse';

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
    TModel extends Model,
    TResultModel extends SaveModelResponse<TModel>
> {
    @Input() public FormComponent: FormComponent<TModel, TResultModel>;
    public ObjectKeys = Object.keys;

    public save(): void {
        this.FormComponent.save();
    }
}
