import { Component, HostBinding, Input } from '@angular/core';
import { NavigationItem } from './NavigationItem';

@Component({
    selector: 'nav-group',
    templateUrl: './NavigationGroupComponent.html',
    styleUrls: ['./NavigationGroupComponent.scss']
})
export class NavigationGroupComponent {
    @HostBinding('class')
    classes = 'nav-group nav-item';

    @Input() item: NavigationItem;

    /**
     * Constructor
     */
    constructor() {
    }
}
