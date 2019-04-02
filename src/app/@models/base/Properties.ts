import { Type } from 'class-transformer';

export class PropertiesElementValue {
    public siteId: string;
    public value: any;
}

export class PropertiesElement {
    public name: string;
    public key: string;
    public values: Array<PropertiesElementValue>;
    public type: PropertiesElementType;
    public isRequired: boolean;
}

export enum PropertiesElementType {
    String = 1,
    HtmlString = 2,
    PasswordString = 3,
    Number = 4,
    Date = 5,
    DateTime = 6,
    Dropdown = 7,
    LongString = 8,
    Checkbox = 9,
    Url = 10
}

export enum PropertiesFrequency {
    OnePerEntity = 1,
    OnePerSite = 2
}

export class PropertiesOption {
    public title: string;
    public value: any;
    public group: string;
}

export class Properties {
    public name: string;
    public key: string;
    public isEditable: boolean;
    public frequency: PropertiesFrequency;

    @Type(() => PropertiesElement)
    public properties: Array<PropertiesElement> = [];
}
