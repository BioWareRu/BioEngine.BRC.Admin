// import { JsonProperty } from 'json-object-mapper';

export abstract class ListResult<T> {
  public abstract Data: T[];

  // @JsonProperty()
  public TotalItems: number;
}
