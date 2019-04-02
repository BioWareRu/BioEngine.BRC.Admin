import { Type } from 'class-transformer';

export class RestError {
  public message: string;
  public field: string;
}

export class RestResult {
  public code: number;
  @Type(() => RestError)
  public errors: Array<RestError> = [];
  public message: string;
  public isSuccess: boolean;
}
