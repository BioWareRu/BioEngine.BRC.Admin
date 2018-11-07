import { Model } from '../../@models/base/Model';
import { ListTableColumnType } from './ListEnums';
import { ListTableColumnAction } from './ListTableColumnAction';
import { Site } from '../../@models/Site';
import { BaseSection } from '../../@models/Section';
import { Tag } from '../../@models/Tag';

export class ListTableColumn<T = Model> {
    public Title: string;
    public Key: string;
    public Sortable: boolean;
    public Type: ListTableColumnType;
    public Disabled: boolean;
    public Actions: ListTableColumnAction<T>[] = [];
    public DoClick: (model: T) => any;
    private getter: (model: T) => {};
    private linkGetter: (model: T) => {};

    constructor(
        key: string,
        title: string,
        type: ListTableColumnType = ListTableColumnType.Text
    ) {
        this.Key = key;
        this.Title = title;
        this.Type = type;
    }

    public setSortable(sortable: boolean = true): ListTableColumn<T> {
        this.Sortable = sortable;
        return this;
    }

    public setCustomGetter(getter: (model: T) => {}): ListTableColumn<T> {
        this.getter = getter;
        return this;
    }

    public setLinkGetter(linkGetter: (model: T) => {}): ListTableColumn<T> {
        this.Type = ListTableColumnType.Link;
        this.linkGetter = linkGetter;
        return this;
    }

    public AddAction(action: ListTableColumnAction<T>): ListTableColumn<T> {
        this.Type = ListTableColumnType.Actions;
        this.Actions.push(action);
        return this;
    }

    public setDisabled(disabled: boolean): ListTableColumn<T> {
        this.Disabled = disabled;
        return this;
    }

    public getValue(model: T): any {
        if (this.getter) {
            return this.getter(model);
        }
        return model.hasOwnProperty(this.Key) ? model[this.Key] : null;
    }

    public getLink(model: T): any {
        if (this.linkGetter) {
            return this.linkGetter(model);
        }
        return null;
    }

    public Click(model: T): void {
        this.DoClick(model);
    }

    public setClick(click: (model: T) => any): ListTableColumn<T> {
        this.Type = ListTableColumnType.ActionLink;
        this.DoClick = click;
        return this;
    }
}

export class SitesTableColumn<T = Model> extends ListTableColumn<T> {
    public Sites: Site[] = [];

    constructor(key: string, title: string, sites: Site[]) {
        super(key, title, ListTableColumnType.SitesList);
        sites.forEach(site => {
            this.Sites[site.Id] = site;
        });
    }
}

export class SiteTableColumn<T = Model> extends ListTableColumn<T> {
    public Sites: Site[] = [];

    constructor(key: string, title: string, sites: Site[]) {
        super(key, title, ListTableColumnType.Site);
        sites.forEach(site => {
            this.Sites[site.Id] = site;
        });
    }
}

export class SectionsTableColumn<T = Model> extends ListTableColumn<T> {
    public Sections: BaseSection[] = [];

    constructor(key: string, title: string, sections: BaseSection[]) {
        super(key, title, ListTableColumnType.SectionsList);
        sections.forEach(section => {
            this.Sections[section.Id] = section;
        });
    }
}

export class TagsTableColumn<T = Model> extends ListTableColumn<T> {
    public Tags: Tag[] = [];

    constructor(key: string, title: string, tags: Tag[]) {
        super(key, title, ListTableColumnType.TagsList);
        tags.forEach(tag => {
            this.Tags[tag.Id] = tag;
        });
    }
}

export class AuthorTableColumn<T = Model> extends ListTableColumn<T> {
    constructor(key: string, title: string) {
        super(key, title, ListTableColumnType.Author);
    }
}
