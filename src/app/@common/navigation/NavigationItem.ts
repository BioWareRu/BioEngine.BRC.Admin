import { Icon } from '../shared/icon/Icon';

export class NavigationItem {
    id: string;
    title: string;
    type: 'item' | 'group' | 'collapsable';
    icon?: Icon;
    url?: string;
    exactMatch?: boolean;
    children?: NavigationItem[];
}
