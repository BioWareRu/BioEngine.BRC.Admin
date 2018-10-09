import {Model} from './base/Model';

export class Forum extends Model {
  Id: number;
  Name: string;
  Topics: number;
  Url: string;
  parent_id: number;
  Children: any[];
  FullName: string;
  Category: string;
}
