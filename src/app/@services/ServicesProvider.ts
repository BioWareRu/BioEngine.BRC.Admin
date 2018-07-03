import {Injectable} from '@angular/core';
import {PostsService} from './PostsService';
import {SitesService} from "./SitesService";
import {DevelopersService} from "./DevelopersService";
import {GamesService} from "./GamesService";
import {TopicsService} from "./TopicsService";
import {SectionsService} from "./SectionsService";
import {ContentService} from "./ContentService";
import {GalleryService} from "./GalleryService";
import {TagsService} from "./TagsService";

@Injectable()
export class ServicesProvider {
  public constructor(
    private _postsService: PostsService,
    private _sitesService: SitesService,
    private _developersService: DevelopersService,
    private _gamesService: GamesService,
    private _topicsService: TopicsService,
    private _sectionsService: SectionsService,
    private _contentService: ContentService,
    private _galleryService: GalleryService,
    private _tagsService: TagsService) {

  }

  get PostsService(): PostsService {
    return this._postsService;
  }

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

  get ContentService(): ContentService {
    return this._contentService;
  }

  get GalleryService(): GalleryService {
    return this._galleryService;
  }

  get TagsService(): TagsService {
    return this._tagsService;
  }
}
