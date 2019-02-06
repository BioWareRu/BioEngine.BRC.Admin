import { container } from '@angular/core/src/render3';

export interface IKeyedCollection<T, TKey> {
    Add(key: TKey, value: T): void;
    ContainsKey(key: TKey): boolean;
    Count(): number;
    Item(key: TKey): T;
    Keys(): TKey[];
    Remove(key: TKey): T;
    Values(): T[];
    Clear(): void;
    First(): T;
    Last(): T;
}

export class KeyedCollection<T> implements IKeyedCollection<T, string> {
    private items: { [index: string]: T } = {};

    private count = 0;
    First(): T {
        for (const i in this.items) {
            if (this.items.hasOwnProperty(i)) {
                return this.items[i];
            }
        }
    }
    Last(): T {
        let item: T;
        for (const i in this.items) {
            if (this.items.hasOwnProperty(i)) {
                item = this.items[i];
            }
        }
        return item;
    }
    public Clear(): void {
        this.items = {};
        this.count = 0;
    }

    public ContainsKey(key: string): boolean {
        return this.items.hasOwnProperty(key);
    }

    public Count(): number {
        return this.count;
    }

    public Add(key: string, value: T): void {
        if (!this.items.hasOwnProperty(key)) {
            this.count++;
        }

        this.items[key] = value;
    }

    public Remove(key: string): T {
        const val = this.items[key];
        delete this.items[key];
        this.count--;
        return val;
    }

    public Item(key: string): T {
        return this.items[key];
    }

    public Keys(): string[] {
        const keySet: string[] = [];

        for (const prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                keySet.push(prop);
            }
        }

        return keySet;
    }

    public Values(): T[] {
        const values: T[] = [];

        for (const prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                values.push(this.items[prop]);
            }
        }

        return values;
    }
}

export class NumberKeyedCollection<T> implements IKeyedCollection<T, number> {
    private items: { [index: number]: T } = {};

    private count = 0;

    public Clear(): void {
        this.items = {};
        this.count = 0;
    }

    public ContainsKey(key: number): boolean {
        return this.items.hasOwnProperty(key);
    }

    public Count(): number {
        return this.count;
    }

    public Add(key: number, value: T): void {
        if (!this.items.hasOwnProperty(key)) {
            this.count++;
        }

        this.items[key] = value;
    }

    public Remove(key: number): T {
        const val = this.items[key];
        delete this.items[key];
        this.count--;
        return val;
    }

    public Item(key: number): T {
        return this.items[key];
    }

    public Keys(): number[] {
        const keySet: number[] = [];

        for (const prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                keySet.push((prop as unknown) as number);
            }
        }

        return keySet;
    }

    public Values(): T[] {
        const values: T[] = [];

        for (const prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                values.push(this.items[prop]);
            }
        }

        return values;
    }

    First(): T {
        for (const i in this.items) {
            if (this.items.hasOwnProperty(i)) {
                return this.items[i];
            }
        }
    }
    Last(): T {
        let item: T;
        for (const i in this.items) {
            if (this.items.hasOwnProperty(i)) {
                item = this.items[i];
            }
        }
        return item;
    }
}
