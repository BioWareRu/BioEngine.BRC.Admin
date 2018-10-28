import {Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {NavigationItem} from './NavigationItem';
import {Subject} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {brcAnimations} from '../animations';

@Component({
    selector: 'nav-collapsable',
    templateUrl: './collapsable.component.html',
    styleUrls: ['./collapsable.component.scss'],
    animations: brcAnimations
})
export class NavigationCollapsableComponent implements OnInit, OnDestroy {
    @Input()
    item: NavigationItem;

    @HostBinding('class')
    classes = 'nav-collapsable nav-item';

    @HostBinding('class.open')
    public isOpen = false;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {Router} _router
     */
    constructor(
        private _router: Router
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this._router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((event: NavigationEnd) => {

                if (this.isUrlInChildren(this.item, event.urlAfterRedirects)) {
                    this.expand();
                }
                else {
                    this.collapse();
                }
            });

        if (this.isUrlInChildren(this.item, this._router.url)) {
            this.expand();
        }
        else {
            this.collapse();
        }
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    toggleOpen(ev): void {
        ev.preventDefault();
        this.isOpen = !this.isOpen;
    }

    expand(): void {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
    }

    collapse(): void {
        if (!this.isOpen) {
            return;
        }
        this.isOpen = false;
    }

    isChildrenOf(parent, item): boolean {
        if (!parent.children) {
            return false;
        }

        if (parent.children.indexOf(item) !== -1) {
            return true;
        }

        for (const children of parent.children) {
            if (children.children) {
                return this.isChildrenOf(children, item);
            }
        }
    }

    isUrlInChildren(parent, url): boolean {
        if (!parent.children) {
            return false;
        }

        for (let i = 0; i < parent.children.length; i++) {
            if (parent.children[i].children) {
                if (this.isUrlInChildren(parent.children[i], url)) {
                    return true;
                }
            }

            if (parent.children[i].url === url || url.includes(parent.children[i].url)) {
                return true;
            }
        }

        return false;
    }
}
