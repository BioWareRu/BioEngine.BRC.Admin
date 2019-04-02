import { Injectable } from '@angular/core';
import { CacheProvider } from '@common/CacheProvider';
import { Site } from '@models/Site';
import { SitesService } from '../SitesService';

@Injectable({
    providedIn: 'root'
})
export class SitesCacheProvider extends CacheProvider<Site> {
    constructor(service: SitesService) {
        super(service);
    }
}
