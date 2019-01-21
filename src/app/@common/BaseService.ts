import { RestClient } from './HttpClient';
import { ListResult } from './list/ListResult';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { SaveModelResponse } from './SaveModelResponse';
import { ClassType } from 'class-transformer/ClassTransformer';
import { StorageItem } from '../@models/results/StorageItem';
import { Observable } from 'rxjs';
import { Filter } from './Filter';
import { InputFile } from 'ngx-input-file';

export abstract class BaseService<T> {
    protected constructor(protected httpClient: RestClient) {}

    public getAll(
        page: number = 0,
        perPage: number = 10,
        sort = '',
        filter: Filter = null
    ): Observable<ListResult<T>> {
        return this.httpClient
            .get(this.getResource(), {
                limit: perPage || 10,
                offset: page > 0 ? perPage * (page - 1) : 0,
                order: sort,
                filter: filter == null ? null : filter.toString()
            })
            .pipe(
                map(res =>
                    plainToClass(this.getListType(), res as ListResult<T>)
                )
            );
    }

    public get(id: number): Observable<T> {
        return this.httpClient
            .get(this.getResource() + '/' + id, {})
            .pipe(map(res => plainToClass(this.getType(), res as T)));
    }

    public new(): Observable<T> {
        return this.httpClient
            .get(this.getResource() + '/new', {})
            .pipe(map(res => plainToClass(this.getType(), res as T)));
    }

    public add(item: T): Observable<SaveModelResponse<T>> {
        return this.httpClient
            .post(this.getResource(), item)
            .pipe(
                map(res =>
                    plainToClass(this.getSaveType(), res as SaveModelResponse<
                        T
                    >)
                )
            );
    }

    public update(id: number, item: T): Observable<SaveModelResponse<T>> {
        return this.httpClient
            .put(this.getResource() + '/' + id, item)
            .pipe(
                map(res =>
                    plainToClass(this.getSaveType(), res as SaveModelResponse<
                        T
                    >)
                )
            );
    }

    public publish(id: number): Observable<T> {
        return this.httpClient
            .post(this.getResource() + '/publish/' + id, {})
            .pipe(map(res => plainToClass(this.getType(), res as T)));
    }

    public unpublish(id: number): Observable<T> {
        return this.httpClient
            .post(this.getResource() + '/hide/' + id, {})
            .pipe(map(res => plainToClass(this.getType(), res as T)));
    }

    public delete(id: number): Observable<boolean> {
        return this.httpClient
            .delete(this.getResource() + '/' + id)
            .pipe(map(() => true));
    }

    public count(): Observable<number> {
        return this.httpClient
            .get(this.getResource() + '/count', {})
            .pipe(map(res => res as number));
    }

    protected abstract getResource(): string;

    protected abstract getListType(): ClassType<ListResult<T>>;

    protected abstract getSaveType(): ClassType<SaveModelResponse<T>>;

    protected abstract getType(): ClassType<T>;
}

export interface IBaseServiceWithUpload {
    upload(file: File): Observable<StorageItem>;
}

export interface IBaseServiceCreatable<T> {
    create(name: string): Observable<SaveModelResponse<T>>;
}

export abstract class BaseServiceWithUpload<T> extends BaseService<T>
    implements IBaseServiceWithUpload {
    public upload(file: File): Observable<StorageItem> {
        return this.httpClient
            .post(this.getResource() + '/upload/', file, { name: file.name })
            .pipe(map(data => plainToClass(StorageItem, data as StorageItem)));
    }
}
