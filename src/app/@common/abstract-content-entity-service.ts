import { AbstractServiceWithUpload } from '@common/AbstractServiceWithUpload';
import { AbstractEntity } from '@models/base/AbstractEntity';
import { IContentEntity } from '@models/interfaces/IContentEntity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class AbstractContentEntityService<T extends AbstractEntity & IContentEntity> extends AbstractServiceWithUpload<T> {
    public publish(id: number): Observable<T> {
        return this._httpClient
            .post(this._getResource() + '/publish/' + id, {})
            .pipe(map(res => <T>res));
    }

    public unpublish(id: number): Observable<T> {
        return this._httpClient
            .post(this._getResource() + '/hide/' + id, {})
            .pipe(map(res => <T>res));
    }
}
