import { Site } from '../../@models/Site';
import { Injectable } from '@angular/core';
import { CacheProvider } from 'app/@common/CacheProvider';
import { SitesService } from '../SitesService';
@Injectable({
    providedIn: 'root'
})
export class SitesCacheProvider extends CacheProvider<Site> {
    constructor(service: SitesService) {
        super(service);
    }
}
