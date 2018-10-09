import {ListResult} from '../../@common/list/ListResult';
import {SaveModelResponse} from '../../@common/SaveModelResponse';
import {Type} from 'class-transformer';
import {File} from '../File';

export class FileListResult extends ListResult<File> {

  @Type(() => File)
  public Data: File[];
}

export class SaveFileResponse extends SaveModelResponse<File> {

}
