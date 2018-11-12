import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from './StateService';
import { SnackBarService } from './snacks/SnackBarService';
import { DialogService } from './modals/DialogService';

export abstract class PageComponent {
    public SnackBarService: SnackBarService;
    protected StateService: StateService;
    protected Router: Router;
    protected Route: ActivatedRoute;
    protected DialogService: DialogService;

    protected constructor(context: PageContext) {
        this.StateService = context.StateService;
        this.Route = context.Route;
        this.Router = context.Router;
        this.SnackBarService = context.SnackBarService;
        this.DialogService = context.DialogService;
    }

    protected setTitle(title: string): void {
        this.StateService.setTitle(title);
    }
}

@Injectable()
export class PageContext {
    public StateService: StateService;

    public Router: Router;

    public SnackBarService: SnackBarService;

    public Route: ActivatedRoute;
    public DialogService: DialogService;

    constructor(
        stateService: StateService,
        router: Router,
        route: ActivatedRoute,
        snackBarService: SnackBarService,
        dialogService: DialogService
    ) {
        this.Route = route;
        this.SnackBarService = snackBarService;
        this.Router = router;
        this.StateService = stateService;
        this.DialogService = dialogService;
    }
}
