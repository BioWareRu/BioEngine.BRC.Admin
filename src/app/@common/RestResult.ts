export class RestResult {
  public code: number = undefined;
  public errors: RestError[] = [];
  public message: string = undefined;
  public isSuccess: boolean = undefined;
}

export class RestError {
  public message: string = undefined;
  public field: string = undefined;
}
