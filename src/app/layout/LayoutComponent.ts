import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { User } from 'bioengine-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavigationItem } from '@common/navigation/NavigationItem';
import { StateService } from '@common/StateService';
import { UsersService } from '@services/UsersService';

@Component({
    selector: 'app-layout',
    templateUrl: './LayoutComponent.html',
    styleUrls: ['./LayoutComponent.scss']
})
export class LayoutComponent {
    isHandset$: Observable<boolean> = this._breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(map(result => result.matches));
    @Input() navigation: Array<NavigationItem>;
    public user: User;
    public title: string;
    public showSidebar = true;

    constructor(
        private readonly _breakpointObserver: BreakpointObserver,
        private readonly _usersService: UsersService,
        public stateService: StateService
    ) {
        this._usersService.getUser().subscribe(user => (this.user = user));
        this.stateService.onTitleChange().subscribe(title =>
            setTimeout(() => {
                this.title = title;
            }, 1)
        );
        this.stateService.onSidebarStateChange().subscribe(show => {
            this.showSidebar = show;
        });
    }
}
