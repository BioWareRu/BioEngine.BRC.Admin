import { Observable } from 'rxjs';
import { Filter } from './Filter';
import { AbstractListResult } from './list/abstract-list-result';
import { SaveModelResponse } from './SaveModelResponse';
export interface IBaseService<T> {
    getAll(page: number | null, perPage: number | null, sort: string | null, filter: Filter | null): Observable<AbstractListResult<T>>;
    get(id: string): Observable<T>;
    getNew(): Observable<T>;
    add(item: T): Observable<SaveModelResponse<T>>;
    update(id: number, item: T): Observable<SaveModelResponse<T>>;
    delete(id: number): Observable<boolean>;
    count(): Observable<number>;
}
