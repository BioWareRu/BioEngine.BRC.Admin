import { AbstractEntity } from '@models/base/AbstractEntity';
import { User } from '@models/User';

export class ContentItemTemplate extends AbstractEntity {
    public contentType: string;
    public sectionIds: string[];
    public tagIds: string[];
    public sections: any[];
    public tags: any[];
    public authorId: number;
    public author: User;
}
