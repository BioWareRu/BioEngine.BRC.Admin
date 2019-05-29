import { Type } from 'class-transformer';
export class MenuItem {
    public label: string;
    public url: string;
    @Type(() => MenuItem)
    public items: Array<MenuItem> = [];
}
