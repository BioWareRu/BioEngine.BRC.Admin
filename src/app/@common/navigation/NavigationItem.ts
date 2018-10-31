export class NavigationItem {
    id: string;
    title: string;
    type: 'item' | 'group' | 'collapsable';
    icon?: string;
    url?: string;
    exactMatch?: boolean;
    children?: NavigationItem[];
}
