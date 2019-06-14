import { Injectable } from '@angular/core';
import { CacheProvider } from '@common/CacheProvider';
import { AbstractSection } from '@models/base/AbstractSection';
import { SectionsService } from '../SectionsService';

@Injectable({
    providedIn: 'root'
})
export class SectionsCacheProvider extends CacheProvider<AbstractSection> {
    constructor(service: SectionsService) {
        super(service);
    }
}
