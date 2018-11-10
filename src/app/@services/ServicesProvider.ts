import { Injectable } from '@angular/core';
import { SitesService } from './SitesService';
import { DevelopersService } from './DevelopersService';
import { GamesService } from './GamesService';
import { TopicsService } from './TopicsService';
import { SectionsService } from './SectionsService';
import { PostsService } from './ContentService';
import { TagsService } from './TagsService';
import { PagesService } from './PagesService';
import { ForumsService } from './ForumsService';
import { PropertiesService } from './properties.service';
import { MenuService } from './MenuService';

@Injectable()
export class ServicesProvider {
    public constructor(
        private _sitesService: SitesService,
        private _developersService: DevelopersService,
        private _gamesService: GamesService,
        private _topicsService: TopicsService,
        private _sectionsService: SectionsService,
        private _postsService: PostsService,
        private _tagsService: TagsService,
        private _pagesService: PagesService,
        private _forumsService: ForumsService,
        private _propertiesService: PropertiesService,
        private _menuService: MenuService
    ) {}

    get SitesService(): SitesService {
        return this._sitesService;
    }

    get DevelopersService(): DevelopersService {
        return this._developersService;
    }

    get GamesService(): GamesService {
        return this._gamesService;
    }

    get TopicsService(): TopicsService {
        return this._topicsService;
    }

    get SectionsService(): SectionsService {
        return this._sectionsService;
    }

    get PostsService(): PostsService {
        return this._postsService;
    }

    get TagsService(): TagsService {
        return this._tagsService;
    }

    get PagesService(): PagesService {
        return this._pagesService;
    }

    get ForumsService(): ForumsService {
        return this._forumsService;
    }

    get PropertiesService(): PropertiesService {
        return this._propertiesService;
    }

    get MenuService(): MenuService {
        return this._menuService;
    }
}
