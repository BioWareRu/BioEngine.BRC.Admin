import { TagsService } from './../TagsService';
import { Injectable } from '@angular/core';
import { CacheProvider } from 'app/@common/CacheProvider';
import { Tag } from 'app/@models/Tag';
@Injectable({
    providedIn: 'root'
})
export class TagsCacheProvider extends CacheProvider<Tag> {
    constructor(service: TagsService) {
        super(service);
    }
}
