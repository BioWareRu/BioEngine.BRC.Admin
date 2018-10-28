import {Component, Input} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NavigationItem} from '../@common/navigation/NavigationItem';
import {UsersService} from '../@services/UsersService';
import {User} from '../@models/User';
import {StateService} from '../@common/StateService';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );
    @Input() navigation: NavigationItem[];
    public user: User;
    public title: string;

    constructor(private breakpointObserver: BreakpointObserver, private usersService: UsersService, private stateService: StateService) {
        this.usersService.getUser().subscribe(user => this.user = user);
        this.stateService.onTitleChange().subscribe(title => this.title = title);
    }
}
