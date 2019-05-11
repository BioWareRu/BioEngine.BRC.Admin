import { Injectable } from '@angular/core';
import { AdsService } from '@services/AdsService';
import { PostsService } from './ContentService';
import { DevelopersService } from './DevelopersService';
import { ForumsService } from './ForumsService';
import { GamesService } from './GamesService';
import { MenuService } from './MenuService';
import { PagesService } from './PagesService';
import { PropertiesService } from './properties.service';
import { SectionsService } from './SectionsService';
import { SitesService } from './SitesService';
import { TagsService } from './TagsService';
import { TopicsService } from './TopicsService';

@Injectable()
export class ServicesProvider {
    public constructor(
        private readonly _sitesService: SitesService,
        private readonly _developersService: DevelopersService,
        private readonly _gamesService: GamesService,
        private readonly _topicsService: TopicsService,
        private readonly _sectionsService: SectionsService,
        private readonly _postsService: PostsService,
        private readonly _tagsService: TagsService,
        private readonly _pagesService: PagesService,
        private readonly _forumsService: ForumsService,
        private readonly _propertiesService: PropertiesService,
        private readonly _menuService: MenuService,
        private readonly _adsService: AdsService,
    ) {
    }

    get sitesService(): SitesService {
        return this._sitesService;
    }

    get developersService(): DevelopersService {
        return this._developersService;
    }

    get gamesService(): GamesService {
        return this._gamesService;
    }

    get topicsService(): TopicsService {
        return this._topicsService;
    }

    get sectionsService(): SectionsService {
        return this._sectionsService;
    }

    get postsService(): PostsService {
        return this._postsService;
    }

    get tagsService(): TagsService {
        return this._tagsService;
    }

    get pagesService(): PagesService {
        return this._pagesService;
    }

    get adsService(): AdsService {
        return this._adsService;
    }

    get forumsService(): ForumsService {
        return this._forumsService;
    }

    get propertiesService(): PropertiesService {
        return this._propertiesService;
    }

    get menuService(): MenuService {
        return this._menuService;
    }
}
