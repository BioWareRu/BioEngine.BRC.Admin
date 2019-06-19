import { AbstractServiceWithUpload } from '@common/AbstractServiceWithUpload';
import { Filter } from '@common/Filter';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { AbstractEntity } from '@models/base/AbstractEntity';
import { ContentItemTemplate } from '@models/ContentItemTemplate';
import { IContentEntity } from '@models/interfaces/IContentEntity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class AbstractContentEntityService<T extends AbstractEntity & IContentEntity> extends AbstractServiceWithUpload<T> {
    public publish(id: string): Observable<T> {
        return this._httpClient
            .post(this._getResource() + '/publish/' + id, {})
            .pipe(map(res => <T>res));
    }

    public unpublish(id: string): Observable<T> {
        return this._httpClient
            .post(this._getResource() + '/hide/' + id, {})
            .pipe(map(res => <T>res));
    }

    public createTemplate(id: string): Observable<ContentItemTemplate> {
        return this._httpClient
            .post(this._getResource() + '/templates/new/' + id, {})
            .pipe(map(res => <ContentItemTemplate>res));
    }

    public createFromTemplate(templateId: string): Observable<T> {
        return this._httpClient
            .get(this._getResource() + '/new/template/' + templateId, {})
            .pipe(map(res => <T>res));
    }

    public templates(page: number | null = 0,
                     perPage: number | null = 10,
                     sort: string | null = '',
                     filter: Filter | null = null
    ): Observable<AbstractListResult<ContentItemTemplate>> {
        return this._httpClient
            .get(this._getResource() + '/templates/', {
                limit: perPage || 10,
                offset: page !== null && perPage !== null && page > 0 ? perPage * page : 0,
                order: sort,
                filter: filter === null ? null : filter.toString()
            })
            .pipe(map(res => <AbstractListResult<ContentItemTemplate>>res));
    }
}
