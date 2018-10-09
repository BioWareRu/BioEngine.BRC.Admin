import {Model} from './base/Model';

export class Site extends Model {
  public Id: number;
  public Title: string;
  public Url: string;
  public IsPublished: boolean;
  public DateAdded: string;
  public DateUpdated: string;
  public DatePublished: string;
}
