import {ChangeDetectorRef, Component, Input, ViewChild} from '@angular/core';
import {FormInput} from './FormInput';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEdit, faBan, faTimes} from '@fortawesome/free-solid-svg-icons';
import {GalleryService} from "../../@services/GalleryService";
import {Observable} from "rxjs/Observable";
import "rxjs-compat/add/observable/forkJoin";
import {StorageItem} from "../../@models/results/StorageItem";
import {FileSystemFileEntry, UploadEvent, UploadFile} from "ngx-file-drop";
import {ToastsService} from "../ToastsService";

@Component({
  selector: 'images-upload-input',
  templateUrl: './ImagesUploadInputComponent.html',
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
export class ImagesUploadInputComponent extends FormInput {
  @Input() public Types: string[] = [];
  @Input() public Multiple: boolean;
  @ViewChild('fileInput') fileInput;
  protected pictures: StorageItem[] = [];

  public constructor(cd: ChangeDetectorRef, private galleryService: GalleryService, private toastsService: ToastsService) {
    super(cd);
    library.add(faEdit);
    library.add(faBan);
    library.add(faTimes);
  }


  ngOnInit() {
    super.ngOnInit();
    if (this.Control.value) {
      if (this.Control.value.length) {
        this.pictures = this.Control.value;
      }
      else {
        this.pictures = [this.Control.value];
      }
    }
  }

  openFileChooseDialog() {
    this.fileInput.nativeElement.click()
  }

  onValueChange($event) {
    if ($event.target.files && $event.target.files.length) {
      const queue = [];
      for (const key in $event.target.files) {
        if (!$event.target.files.hasOwnProperty(key)) continue;
        queue.push(this.galleryService.upload($event.target.files[key]));
      }
      this.processUpload(queue);
    }
  }

  delete(index: number) {
    this.pictures.splice(index, 1);
    this.Control.patchValue(this.pictures);
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
            this.toastsService.error("Файл был отброшен", "Файл " + file.name + " имеет недопустимый тип " + file.type);
          }
          else {
            queue.push(this.galleryService.upload(file));
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
      this.toastsService.error("Ошибка выбора файла", "Разрешено загружать только 1 файл");
      return;
    }
    this.toastsService.warning("Загрузка файлов", "Загрузка файлов в процессе");
    Observable.forkJoin(queue).subscribe(results => {
      if (this.Multiple) {
        this.pictures = this.pictures.concat(results);
        this.Control.patchValue(this.pictures);
      } else {
        const picture = results[0];
        this.pictures = [picture];
        this.Control.patchValue(picture);
      }
      this.toastsService.success("Загрузка файлов", "Загрузка файлов успешно завершена");
    });
  }
}
