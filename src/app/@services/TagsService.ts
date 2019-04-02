import { Injectable } from '@angular/core';
import { ClassType } from 'class-transformer/ClassTransformer';
import { Observable } from 'rxjs';
import { AbstractBaseService, IBaseServiceCreatable } from '@common/abstract-base-service';
import { RestClient } from '@common/HttpClient';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { SaveTagResponse, TagListResult } from '@models/results/Tag';
import { Tag } from '@models/Tag';

@Injectable()
export class TagsService extends AbstractBaseService<Tag> implements IBaseServiceCreatable<Tag> {

    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    public create(name: string): Observable<SaveModelResponse<Tag>> {
        const tag = new Tag();
        tag.name = name;

        return this.add(tag);
    }

    protected _getListType(): ClassType<AbstractListResult<Tag>> {
        return TagListResult;
    }

    protected _getSaveType(): ClassType<SaveModelResponse<Tag>> {
        return SaveTagResponse;
    }

    protected _getType(): ClassType<Tag> {
        return Tag;
    }

    protected _getResource(): string {
        return 'tags';
    }
}
