import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StateService} from './StateService';
import {SnackBarService} from './snacks/SnackBarService';

export abstract class PageComponent {
    public Title = 'Пустой заголовок';
    public SnackBarService: SnackBarService;
    protected StateService: StateService;
    protected Router: Router;
    protected Route: ActivatedRoute;

    protected constructor(context: PageContext) {
        this.StateService = context.StateService;
        this.Route = context.Route;
        this.Router = context.Router;
        this.SnackBarService = context.SnackBarService;
        this.StateService.onTitleChange().subscribe(title => {
            this.Title = title;
            document.title = title + ' - BRC Games';
        });
    }
}

@Injectable()
export class PageContext {
    public StateService: StateService;

    public Router: Router;

    public SnackBarService: SnackBarService;

    public Route: ActivatedRoute;

    constructor(stateService: StateService, router: Router, route: ActivatedRoute, snackBarService: SnackBarService) {
        this.Route = route;
        this.SnackBarService = snackBarService;
        this.Router = router;
        this.StateService = stateService;
    }
}
