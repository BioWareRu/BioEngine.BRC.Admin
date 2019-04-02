import { Injectable } from '@angular/core';
import { CacheProvider } from '@common/CacheProvider';
import { Tag } from '@models/Tag';
import { TagsService } from './../TagsService';

@Injectable({
    providedIn: 'root'
})
export class TagsCacheProvider extends CacheProvider<Tag> {
    constructor(service: TagsService) {
        super(service);
    }
}
