import {Component, Input, ViewEncapsulation} from '@angular/core';
import {NavigationItem} from './NavigationItem';

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavigationComponent {
    @Input() navigation: NavigationItem[];
}
