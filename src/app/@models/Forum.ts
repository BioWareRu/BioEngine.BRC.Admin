
export class Forum {
  id: number;
  name: string;
  topics: number;
  parentId: number;
  children: Array<any>;
  fullName: string;
  category: string;
}
