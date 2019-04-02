import { StorageItem } from '@models/results/StorageItem';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Filter } from './Filter';
import { RestClient } from './HttpClient';
import { AbstractListResult } from './list/abstract-list-result';
import { SaveModelResponse } from './SaveModelResponse';

export abstract class AbstractBaseService<T> {
    protected constructor(protected _httpClient: RestClient) {
    }

    public getAll(
        page: number | null = 0,
        perPage: number | null = 10,
        sort: string | null = '',
        filter: Filter | null = null
    ): Observable<AbstractListResult<T>> {
        const listType = this._getListType();
        if (!listType) {
            throw new Error('No list type');
        }

        return this._httpClient
            .get(this._getResource(), {
                limit: perPage || 10,
                offset: page !== null && perPage !== null && page > 0 ? perPage * (page - 1) : 0,
                order: sort,
                filter: filter === null ? null : filter.toString()
            })
            .pipe(map(res => plainToClass(listType, <AbstractListResult<T>>res)));
    }

    public get(id: string): Observable<T> {
        return this._httpClient
            .get(this._getResource() + '/' + id, {})
            .pipe(map(res => plainToClass(this._getType(), <T>res)));
    }

    public new(): Observable<T> {
        return this._httpClient
            .get(this._getResource() + '/new', {})
            .pipe(map(res => plainToClass(this._getType(), <T>res)));
    }

    public add(item: T): Observable<SaveModelResponse<T>> {
        const saveType = this._getSaveType();
        if (!saveType) {
            throw new Error('No save type');
        }

        return this._httpClient
            .post(this._getResource(), item)
            .pipe(map(res => plainToClass(saveType, <SaveModelResponse<T>>res)));
    }

    public update(id: number, item: T): Observable<SaveModelResponse<T>> {
        const saveType = this._getSaveType();
        if (!saveType) {
            throw new Error('No save type');
        }

        return this._httpClient
            .put(this._getResource() + '/' + id, item)
            .pipe(map(res => plainToClass(saveType, <SaveModelResponse<T>>res)));
    }

    public publish(id: number): Observable<T> {
        return this._httpClient
            .post(this._getResource() + '/publish/' + id, {})
            .pipe(map(res => plainToClass(this._getType(), <T>res)));
    }

    public unpublish(id: number): Observable<T> {
        return this._httpClient
            .post(this._getResource() + '/hide/' + id, {})
            .pipe(map(res => plainToClass(this._getType(), <T>res)));
    }

    public delete(id: number): Observable<boolean> {
        return this._httpClient.delete(this._getResource() + '/' + id).pipe(map(() => true));
    }

    public count(): Observable<number> {
        return this._httpClient
            .get(this._getResource() + '/count', {})
            .pipe(map(res => <number>res));
    }

    protected abstract _getResource(): string;

    protected abstract _getListType(): ClassType<AbstractListResult<T>> | null;

    protected abstract _getSaveType(): ClassType<SaveModelResponse<T>> | null;

    protected abstract _getType(): ClassType<T>;
}

export interface IBaseServiceWithUpload {
    upload(file: File): Observable<StorageItem>;
}

export interface IBaseServiceCreatable<T> {
    create(name: string): Observable<SaveModelResponse<T>>;
}

export abstract class AbstractServiceWithUpload<T> extends AbstractBaseService<T>
    implements IBaseServiceWithUpload {
    public upload(file: File): Observable<StorageItem> {
        return this._httpClient
        // @ts-ignore
            .post(this._getResource() + '/upload/', file, {name: file.name})
            .pipe(map(data => plainToClass(StorageItem, <StorageItem>data)));
    }
}
