import { Icon } from 'bioengine.core.api.client';

export class NavigationItem {
    id: string;
    title: string;
    type: 'item' | 'group' | 'collapsable';
    icon?: Icon;
    url?: string;
    exactMatch?: boolean;
    children?: Array<NavigationItem>;
}
