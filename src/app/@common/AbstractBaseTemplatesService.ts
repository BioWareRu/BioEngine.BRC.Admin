import { ContentItemTemplate } from '@models/ContentItemTemplate';
import { AbstractBaseService, AbstractListResult, Filter, IContentEntity } from 'bioengine.core.api.client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class AbstractBaseTemplatesService<TContent extends IContentEntity> extends AbstractBaseService<ContentItemTemplate> {

    public createTemplate(id: string): Observable<ContentItemTemplate> {
        return this._httpClient
            .post(this._getResource() + '/new/' + id, {})
            .pipe(map(res => <ContentItemTemplate>res));
    }

    public createFromTemplate(templateId: string): Observable<TContent> {
        return this._httpClient
            .get(this._getResource() + '/create/' + templateId, {})
            .pipe(map(res => <TContent>res));
    }

    public templates(page: number | null = 0,
                     perPage: number | null = 10,
                     sort: string | null = '',
                     filter: Filter | null = null
    ): Observable<AbstractListResult<ContentItemTemplate>> {
        return this._httpClient
            .get(this._getResource(), {
                limit: perPage || 10,
                offset: page !== null && perPage !== null && page > 0 ? perPage * page : 0,
                order: sort,
                filter: filter === null ? null : filter.toString()
            })
            .pipe(map(res => <AbstractListResult<ContentItemTemplate>>res));
    }
}
