import {Component, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'loading-bar',
    template: `
        <ng-container *ngIf="visible">
            <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        </ng-container>`,
    styleUrls: ['./loading-bar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoadingBarComponent {
    public visible = false;
    private firstLoad = true;

    constructor(private _router: Router) {
        this._router.events
            .pipe(filter((event) => event instanceof NavigationStart))
            .subscribe(() => {
                this.visible = true;
            });

        this._router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
                this.visible = false;
                if (this.firstLoad) {
                    if (window.hasOwnProperty('loading_screen')) {
                        window['loading_screen'].finish();
                    }
                    this.firstLoad = false;
                }
            });

    }

}
