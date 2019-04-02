import { AbstractModel } from '@models/base/abstract-model';
import { ListTableColumnType } from './ListEnums';
import { ListTableColumnAction } from './ListTableColumnAction';

export class ListTableColumn<T = AbstractModel> {
    public title: string;
    public key: string;
    public sortable: boolean;
    public type: ListTableColumnType;
    public disabled: boolean;
    public hidden = false;
    public actions: Array<ListTableColumnAction<T>> = [];
    public doClick: (model: T) => any;
    private _getter: (model: T) => {};
    private _linkGetter: (model: T) => {};

    constructor(key: string, title: string, type: ListTableColumnType = ListTableColumnType.Text) {
        this.key = key;
        this.title = title;
        this.type = type;
    }

    public setSortable(sortable: boolean = true): ListTableColumn<T> {
        this.sortable = sortable;

        return this;
    }

    public setCustomGetter(getter: (model: T) => {}): ListTableColumn<T> {
        this._getter = getter;

        return this;
    }

    public setLinkGetter(linkGetter: (model: T) => {}): ListTableColumn<T> {
        this.type = ListTableColumnType.Link;
        this._linkGetter = linkGetter;

        return this;
    }

    public addAction(action: ListTableColumnAction<T>): ListTableColumn<T> {
        this.type = ListTableColumnType.Actions;
        this.actions.push(action);

        return this;
    }

    public setDisabled(disabled: boolean): ListTableColumn<T> {
        this.disabled = disabled;

        return this;
    }

    public getValue(model: T): any {
        if (this._getter) {
            return this._getter(model);
        }

        return model.hasOwnProperty(this.key) ? model[this.key] : null;
    }

    public getLink(model: T): any {
        if (this._linkGetter) {
            return this._linkGetter(model);
        }

        return null;
    }

    public click(model: T): void {
        this.doClick(model);
    }

    public setClick(click: (model: T) => any): ListTableColumn<T> {
        this.type = ListTableColumnType.ActionLink;
        this.doClick = click;

        return this;
    }

    public setHidden(hidden: boolean): ListTableColumn<T> {
        this.hidden = hidden;

        return this;
    }
}

export class SitesTableColumn<T = AbstractModel> extends ListTableColumn<T> {
    constructor(key: string, title: string) {
        super(key, title, ListTableColumnType.SitesList);
    }
}

export class SiteTableColumn<T = AbstractModel> extends ListTableColumn<T> {
    constructor(key: string, title: string) {
        super(key, title, ListTableColumnType.Site);
    }
}

export class SectionsTableColumn<T = AbstractModel> extends ListTableColumn<T> {
    constructor(key: string, title: string) {
        super(key, title, ListTableColumnType.SectionsList);
    }
}

export class TagsTableColumn<T = AbstractModel> extends ListTableColumn<T> {
    constructor(key: string, title: string) {
        super(key, title, ListTableColumnType.TagsList);
    }
}

export class AuthorTableColumn<T = AbstractModel> extends ListTableColumn<T> {
    constructor(key: string, title: string) {
        super(key, title, ListTableColumnType.Author);
    }
}
