import { Type } from 'class-transformer';
import { RestError } from './RestError';

export class RestResult {
  public code: number;
  @Type(() => RestError)
  public errors: Array<RestError> = [];
  public message: string;
  public isSuccess: boolean;
}
