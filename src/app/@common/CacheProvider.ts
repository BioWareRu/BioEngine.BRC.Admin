import { BaseService } from 'app/@common/BaseService';
import { KeyedCollection } from './KeyedCollection';
import { Observable, BehaviorSubject } from 'rxjs';
import { Filter, FilterOperator } from './Filter';
import { map } from 'rxjs/operators';
import { Model } from 'app/@models/base/Model';
export class CacheProvider<TModel extends Model> {
    public constructor(private _service: BaseService<TModel>) {}
    private readonly _cache = new KeyedCollection<TModel>();
    private readonly _queue = new KeyedCollection<BehaviorSubject<KeyedCollection<TModel>>>();

    public Get(ids: string[]): Observable<KeyedCollection<TModel>> {
        const models = new KeyedCollection<TModel>();
        const result = new BehaviorSubject<KeyedCollection<TModel>>(models);
        if (!ids) {
            return result.asObservable();
        }
        const key = ids.join('|');
        if (this._queue.ContainsKey(key)) {
            return this._queue.Item(key).asObservable();
        }

        this._queue.Add(key, result);
        const toLoad = [];
        if (ids) {
            ids.forEach(id => {
                if (this._cache.ContainsKey(id)) {
                    models.Add(id, this._cache.Item(id));
                } else {
                    toLoad.push(id);
                }
            });
        }

        if (toLoad.length > 0) {
            const filter = Filter.simple('id', FilterOperator.In, ids);
            this._service.getAll(null, null, null, filter).subscribe(res => {
                res.Data.forEach(model => {
                    this._cache.Add(model.Id, model);
                    models.Add(model.Id, model);
                });
                result.next(models);
                this._queue.Remove(key);
            });
        } else {
            result.next(models);
            this._queue.Remove(key);
        }
        return result;
    }
}
