import {Injectable} from '@angular/core';
import {BaseServiceWithUpload} from '../@common/BaseService';
import {RestClient} from '../@common/HttpClient';
import {ClassType} from 'class-transformer/ClassTransformer';
import {SaveModelResponse} from '../@common/SaveModelResponse';
import {File} from '../@models/File';
import {FileListResult, SaveFileResponse} from '../@models/results/File';
import {ListResult} from '../@common/list/ListResult';

@Injectable()
export class FilesService extends BaseServiceWithUpload<File> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected getListType(): ClassType<ListResult<File>> {
    return FileListResult;
  }

  protected getResource(): string {
    return 'files';
  }

  protected getType(): ClassType<File> {
    return File;
  }

  protected getSaveType(): ClassType<SaveModelResponse<File>> {
    return SaveFileResponse;
  }
}
