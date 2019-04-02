import { Icon } from '../shared/icon/Icon';
import { ListTableColumnActionType } from './ListEnums';

export class ListTableColumnAction<T> {
    public icon: Icon;
    public title: string;
    public type: ListTableColumnActionType;
    public types = ListTableColumnActionType;
    public generateUrl: (model: T) => string;
    public doClick: (model: T) => any;

    constructor(
        title: string,
        icon: Icon,
        type: ListTableColumnActionType = ListTableColumnActionType.Click
    ) {
        this.title = title;
        this.icon = icon;
        this.type = type;
    }

    public setClick(click: (model: T) => any): ListTableColumnAction<T> {
        this.type = ListTableColumnActionType.Click;
        this.doClick = click;

        return this;
    }

    public setExternal(externalLinkGenerator: (model: T) => string): ListTableColumnAction<T> {
        this.type = ListTableColumnActionType.ExternalLink;
        this.generateUrl = externalLinkGenerator;

        return this;
    }

    public click(model: T): void {
        this.doClick(model);
    }
}
