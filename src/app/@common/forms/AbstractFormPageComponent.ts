import { Input, OnInit, ViewChild } from '@angular/core';
import { AbstractBaseService, AbstractEntity, AbstractFormComponent, SaveModelResponse } from 'bioengine.core.api.client';
import { AbstractPageComponent } from '../AbstractPageComponent';

export abstract class AbstractFormPageComponent<TModel extends AbstractEntity, TService extends AbstractBaseService<TModel>> extends AbstractPageComponent implements OnInit {
    @Input()
    public model: TModel | null;
    protected _modelId: string;
    @ViewChild('modelForm', {static: true})
    protected _form: AbstractFormComponent<TModel, TService>;

    ngOnInit(): void {
        this._route.params.subscribe(routeParams => {
            this._loadModel(routeParams);
        });
    }

    protected _loadModel(routeParams: any): void {
        const modelId = routeParams.id;
        if (modelId && modelId !== '') {
            this._loadModelById(modelId);
        } else {
            this._loadNewModel();
        }
    }

    protected _loadNewModel(): void {
        this._getService()
            .getNew()
            .subscribe(model => {
                this.model = model;
                this._setTitle(this._getNewModelTitle());
                this.loadFormData();
            });
    }

    protected _loadModelById(modelId: string): void {
        this._modelId = modelId;
        this._getService()
            .get(modelId)
            .subscribe(model => {
                this.model = model;
                this._setTitle(model.title);
                this.loadFormData();
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

    protected abstract _getService(): TService;

    protected abstract _getRoute(): string;
}
