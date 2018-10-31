import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StateService} from './StateService';
import {SnackBarService} from './snacks/SnackBarService';
import {ConfirmationDialogService} from './modals/ConfirmationDialogService';
import {DialogService} from './modals/DialogService';

export abstract class PageComponent {
    public SnackBarService: SnackBarService;
    protected StateService: StateService;
    protected Router: Router;
    protected Route: ActivatedRoute;
    protected ConfirmationService: ConfirmationDialogService;
    protected DialogService: DialogService;

    protected constructor(context: PageContext) {
        this.StateService = context.StateService;
        this.Route = context.Route;
        this.Router = context.Router;
        this.SnackBarService = context.SnackBarService;
        this.DialogService = context.DialogService;
        this.ConfirmationService = context.ConfirmationService;
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
    public ConfirmationService: ConfirmationDialogService;
    public DialogService: DialogService;

    constructor(
        stateService: StateService,
        router: Router,
        route: ActivatedRoute,
        snackBarService: SnackBarService,
        confirmationService: ConfirmationDialogService,
        dialogService: DialogService) {
        this.Route = route;
        this.SnackBarService = snackBarService;
        this.Router = router;
        this.StateService = stateService;
        this.ConfirmationService = confirmationService;
        this.DialogService = dialogService;
    }
}
