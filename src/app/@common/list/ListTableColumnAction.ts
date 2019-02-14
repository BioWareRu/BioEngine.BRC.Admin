import { ListTableColumnActionType } from './ListEnums';
import { Icon } from '../shared/icon/Icon';

export class ListTableColumnAction<T> {
    public Icon: Icon;
    public Title: string;
    public Type: ListTableColumnActionType;
    public Types = ListTableColumnActionType;
    public GenerateUrl: (model: T) => string;
    public DoClick: (model: T) => any;

    constructor(
        title: string,
        icon: Icon,
        type: ListTableColumnActionType = ListTableColumnActionType.Click
    ) {
        this.Title = title;
        this.Icon = icon;
        this.Type = type;
    }

    public setClick(click: (model: T) => any): ListTableColumnAction<T> {
        this.Type = ListTableColumnActionType.Click;
        this.DoClick = click;
        return this;
    }

    public setExternal(externalLinkGenerator: (model: T) => string): ListTableColumnAction<T> {
        this.Type = ListTableColumnActionType.ExternalLink;
        this.GenerateUrl = externalLinkGenerator;
        return this;
    }

    public Click(model: T): void {
        this.DoClick(model);
    }
}
