import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractBaseService } from '@common/abstract-base-service';
import { IBaseServiceCreatable } from '@common/IBaseServiceCreatable';
import { RestClient } from '@common/HttpClient';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { Tag } from '@models/Tag';

@Injectable()
export class TagsService extends AbstractBaseService<Tag> implements IBaseServiceCreatable<Tag> {

    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    public create(title: string): Observable<SaveModelResponse<Tag>> {
        const tag = new Tag();
        tag.title = title;

        return this.add(tag);
    }

    protected _getResource(): string {
        return 'tags';
    }
}
