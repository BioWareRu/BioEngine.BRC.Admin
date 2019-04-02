export enum FilterOperator {
    Equal = 1,
    NotEqual = 2,
    Greater = 3,
    GreaterOrEqual = 4,
    Less = 5,
    LessOrEqual = 6,
    Contains = 7,
    StartsWith = 8,
    EndsWith = 9,
    In = 10
}

export class Filter {
    constructor(public groups: Array<FilterConditionsGroup> = []) {}

    public static simple(propertyName: string, operator: FilterOperator, value: any): Filter {
        return new Filter([
            new FilterConditionsGroup([new FilterCondition(propertyName, operator, value)])
        ]);
    }

    public static fromString(filter: string): Filter {
        return new Filter(JSON.parse(decodeURIComponent(atob(filter))));
    }

    public toString(): string {
        return btoa(encodeURIComponent(JSON.stringify(this.groups)));
    }
}

export class FilterConditionsGroup {
    constructor(public conditions: Array<FilterCondition> = []) {}
}

export class FilterCondition {
    constructor(public property: string, public operator: FilterOperator, public value: any) {}
}
