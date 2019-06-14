import { Input, OnInit, ViewChild } from '@angular/core';
import { AbstractEntity } from '@models/base/AbstractEntity';
import { map } from 'rxjs/operators';
import { AbstractBaseService } from '../AbstractBaseService';
import { AbstractPageComponent } from '../AbstractPageComponent';
import { SaveModelResponse } from '../SaveModelResponse';
import { AbstractFormComponent } from './AbstractFormComponent';
import { Observable } from 'rxjs';

export abstract class AbstractFormPageComponent<TModel extends AbstractEntity, TService extends AbstractBaseService<TModel>> extends AbstractPageComponent implements OnInit {
    @Input()
    public model: TModel | null;
    protected _modelId: string;
    @ViewChild('modelForm', {static: true})
    protected _form: AbstractFormComponent<TModel, TService>;

    ngOnInit(): void {
        const id: Observable<string> = this._route.params.pipe(map(p => p.id));
        id.subscribe(modelId => {
            if (modelId && modelId !== '') {
                this._modelId = modelId;
                this._getService()
                    .get(modelId)
                    .subscribe(model => {
                        this.model = model;
                        this._setTitle(model.title);
                        this.loadFormData();
                    });
            } else {
                this._getService()
                    .getNew()
                    .subscribe(model => {
                        this.model = model;
                        this._setTitle(this._getNewModelTitle());
                        this.loadFormData();
                    });
            }
        });
    }

    loadFormData(): void {
        this._form.loadFormData(this.model);
        this._form.onSuccessSave.subscribe(result => this._processSuccessSave(result));
    }

    protected _processSuccessSave(saveResult: SaveModelResponse<TModel>): void {
        if (!this._modelId) {
            this._router.navigate([this._getRoute(), saveResult.model.id, 'edit']);
        }
    }

    protected abstract _getNewModelTitle(): string;

    protected abstract _getService(): AbstractBaseService<TModel>;

    protected abstract _getRoute(): string;
}
