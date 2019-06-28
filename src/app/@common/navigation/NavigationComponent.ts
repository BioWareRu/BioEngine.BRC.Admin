import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NavigationItem } from './NavigationItem';

@Component({
    selector: 'navigation',
    templateUrl: './NavigationComponent.html',
    styleUrls: ['./NavigationComponent.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavigationComponent {
    @Input() navigation: Array<NavigationItem>;
}
