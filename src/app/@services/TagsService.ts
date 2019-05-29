import { Injectable } from '@angular/core';
import { ClassType } from 'class-transformer/ClassTransformer';
import { Observable } from 'rxjs';
import { AbstractBaseService } from '@common/abstract-base-service';
import { IBaseServiceCreatable } from '@common/IBaseServiceCreatable';
import { RestClient } from '@common/HttpClient';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { TagListResult } from '@models/results/Tag';
import { SaveTagResponse } from '@models/results/SaveTagResponse';
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
