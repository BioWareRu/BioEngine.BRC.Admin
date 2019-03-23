import { BaseSection } from './../../@models/Section';
import { Injectable } from '@angular/core';
import { CacheProvider } from 'app/@common/CacheProvider';
import { SectionsService } from '../SectionsService';
@Injectable({
    providedIn: 'root'
})
export class SectionsCacheProvider extends CacheProvider<BaseSection> {
    constructor(service: SectionsService) {
        super(service);
    }
}
