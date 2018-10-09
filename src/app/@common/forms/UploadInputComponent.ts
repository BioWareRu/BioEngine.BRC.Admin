import {ChangeDetectorRef, Component, Input, ViewChild} from '@angular/core';
import {FormInput} from './FormInput';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faBan, faEdit, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Observable} from 'rxjs/Observable';
import 'rxjs-compat/add/observable/forkJoin';
import {StorageItem} from '../../@models/results/StorageItem';
import {FileSystemFileEntry, UploadFile} from 'ngx-file-drop';
import {ToastsService} from '../ToastsService';
import {IBaseServiceWithUpload} from '../BaseService';

@Component({
  selector: 'upload-input',
  templateUrl: './UploadInputComponent.html',
  styles: [`
    .imagesList {
      display: flex;
      flex-flow: row wrap;
    }

    .uploadedImage {
      display: flex;
      align-items: center;
      background-color: lightgray;
      width: 100px;
      height: 100px;
      padding: 10px;
      text-align: center;
      margin-right: 10px;
      margin-bottom: 10px;
      position: relative;
    }

    .uploadedImage a.img {
      align-self: center;
      max-width: 100%;
      max-height: 100%;
    }

    .uploadedImage a.delete {
      position: absolute;
      right: -4px;
      top: -7px;
      cursor: pointer;
    }

    .uploadedImage img {
      max-width: 80px;
      max-height: 80px;
    }
  `]
})
export class UploadInputComponent extends FormInput {
  @Input() public Types: string[] = [];
  @Input() public Multiple: boolean;
  @Input() public DisplayMode: string = 'images';
  @Input() public Service: IBaseServiceWithUpload;
  @ViewChild('fileInput') fileInput;
  protected items: StorageItem[] = [];

  public constructor(cd: ChangeDetectorRef, private toastsService: ToastsService) {
    super(cd);
    library.add(faEdit);
    library.add(faBan);
    library.add(faTimes);
  }


  ngOnInit() {
    super.ngOnInit();
    if (this.Control.value == null) {
      return;
    }
    if (Array.isArray(this.Control.value)) {
      if (this.Control.value.length == 0) {
        return;
      }
      this.items = this.Control.value;
      return;
    }
    this.items = [this.Control.value];
  }

  openFileChooseDialog() {
    this.fileInput.nativeElement.click()
  }

  onValueChange($event) {
    if ($event.target.files && $event.target.files.length) {
      const queue = [];
      for (const key in $event.target.files) {
        if (!$event.target.files.hasOwnProperty(key)) continue;
        queue.push(this.Service.upload($event.target.files[key]));
      }
      this.processUpload(queue);
    }
  }

  delete(index: number) {
    this.items.splice(index, 1);
    this.Control.patchValue(this.items);
  }

  processFiles(files: UploadFile[]) {

    const queue = [];
    let length = files.length;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (this.Types.length && this.Types.indexOf(file.type) < 0) {
            length -= 1;
            this.toastsService.error('Файл был отброшен', 'Файл ' + file.name + ' имеет недопустимый тип ' + file.type);
          }
          else {
            queue.push(this.Service.upload(file));
            if (queue.length == length) {
              this.processUpload(queue);
            }
          }
        });
      }
    }
  }

  private processUpload(queue: Observable<StorageItem>[]) {
    if (!this.Multiple && queue.length > 1) {
      this.toastsService.error('Ошибка выбора файла', 'Разрешено загружать только 1 файл');
      return;
    }
    this.toastsService.warning('Загрузка файлов', 'Загрузка файлов в процессе');
    Observable.forkJoin(queue).subscribe(results => {
      if (this.Multiple) {
        this.items = this.items.concat(results);
        this.Control.patchValue(this.items);
      } else {
        const item = results[0];
        this.items = [item];
        this.Control.patchValue(item);
      }
      this.toastsService.success('Загрузка файлов', 'Загрузка файлов успешно завершена');
    });
  }
}
