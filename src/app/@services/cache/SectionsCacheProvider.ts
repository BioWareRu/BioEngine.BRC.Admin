import { Injectable } from '@angular/core';
import { CacheProvider } from '@common/CacheProvider';
import { SectionsService } from '../SectionsService';
import { BaseSection } from '@models/abstract-section';

@Injectable({
    providedIn: 'root'
})
export class SectionsCacheProvider extends CacheProvider<BaseSection> {
    constructor(service: SectionsService) {
        super(service);
    }
}
