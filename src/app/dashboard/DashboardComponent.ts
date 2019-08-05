import { Component } from '@angular/core';
import { AbstractPageComponent } from '@common/AbstractPageComponent';
import { PageContext } from '@common/PageContext';
import { Developer } from '@models/Developer';
import { Game } from '@models/Game';
import { Topic } from '@models/Topic';
import { DevelopersService } from '@services/DevelopersService';
import { GamesService } from '@services/GamesService';
import { TopicsService } from '@services/TopicsService';
import { Page, PagesService, Post, PostsService } from 'bioengine-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './DashboardComponent.html',
    styleUrls: ['./DashboardComponent.scss'],
    providers: [PageContext]
})
export class DashboardComponent extends AbstractPageComponent {

    private _posts = new BehaviorSubject<Post[]>([]);
    private _pages = new BehaviorSubject<Page[]>([]);
    private _games = new BehaviorSubject<Game[]>([]);
    private _developers = new BehaviorSubject<Developer[]>([]);
    private _topics = new BehaviorSubject<Topic[]>([]);

    constructor(context: PageContext,
                postsService: PostsService,
                pageService: PagesService,
                gamesService: GamesService,
                developersService: DevelopersService,
                topicsService: TopicsService) {
        super(context);
        this._stateService.setTitle('Главная');
        postsService.getAll(0, 10, '-dateAdded').subscribe(data => {
            this._posts.next(data.data);
        });
        pageService.getAll(0, 5, '-dateAdded').subscribe(data => {
            this._pages.next(data.data);
        });
        gamesService.getAll(0, 5, '-dateAdded').subscribe(data => {
            this._games.next(data.data);
        });
        developersService.getAll(0, 5, '-dateAdded').subscribe(data => {
            this._developers.next(data.data);
        });
        topicsService.getAll(0, 5, '-dateAdded').subscribe(data => {
            this._topics.next(data.data);
        });
    }

    public get posts(): Observable<Post[]> {
        return this._posts.asObservable();
    }

    public get pages(): Observable<Page[]> {
        return this._pages.asObservable();
    }

    public get games(): Observable<Game[]> {
        return this._games.asObservable();
    }

    public get developers(): Observable<Developer[]> {
        return this._developers.asObservable();
    }

    public get topics(): Observable<Topic[]> {
        return this._topics.asObservable();
    }
}
