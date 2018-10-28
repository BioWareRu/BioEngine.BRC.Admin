import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormInput} from './FormInput';
import {Observable} from 'rxjs/Observable';
import {forkJoin} from 'rxjs';
import {StorageItem} from '../../../@models/results/StorageItem';
import {ToastsService} from '../../ToastsService';
import {IBaseServiceWithUpload} from '../../BaseService';
import {InputFile} from 'ngx-input-file';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'upload-input',
    templateUrl: './UploadInputComponent.html'
})
export class UploadInputComponent extends FormInput implements OnInit {
    @Input() public Types: string[] = [];
    @Input() public Multiple: boolean;
    @Input() public DisplayMode = 'images';
    @Input() public Service: IBaseServiceWithUpload;
    @ViewChild('fileInput') fileInput;
    protected items: StorageItem[] = [];
    private uploadControl: FormControl;

    public constructor(private toastsService: ToastsService) {
        super();
    }


    ngOnInit(): void {

        super.ngOnInit();
        this.uploadControl = new FormControl();
        this.FormGroup.controls[this.FieldName + 'upload'] = this.uploadControl;
        this.generateItems();
    }

    delete(file: InputFile): void {
        if (!this.Multiple) {
            this.Control.patchValue(null);
        } else {

            let values = this.Control.value as StorageItem[];
            values = values.filter(item => {
                return item.PublicUri !== file.link;
            });
            this.Control.patchValue(values);
        }
        this.generateItems();
    }

    processFiles($event: InputFile): void {
        const queue = [];
        queue.push(this.Service.upload($event));
        this.processUpload(queue);
    }

    private generateItems(): void {
        const values = [];
        this.items = [];
        if (this.Control.value !== null) {

            if (Array.isArray(this.Control.value)) {
                if (this.Control.value.length > 0) {
                    this.items = this.Control.value;
                }

            }
            else {
                this.items = [this.Control.value];
            }
        }
        this.items.forEach(item => {
            values.push({
                link: item.PublicUri,
                preview: this.DisplayMode === 'images' ? item.PublicUri : null
            });
        });
        this.uploadControl.setValue(values);
    }

    private processUpload(queue: Observable<StorageItem>[]): void {
        if (!this.Multiple && queue.length > 1) {
            this.toastsService.error('Ошибка выбора файла', 'Разрешено загружать только 1 файл');
            return;
        }
        this.toastsService.warning('Загрузка файлов', 'Загрузка файлов в процессе');
        forkJoin(queue).subscribe(results => {
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
