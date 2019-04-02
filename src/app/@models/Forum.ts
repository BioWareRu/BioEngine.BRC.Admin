import { AbstractModel } from './base/abstract-model';

export class Forum extends AbstractModel {
  name: string;
  topics: number;
  parentId: number;
  children: Array<any>;
  fullName: string;
  category: string;
}
