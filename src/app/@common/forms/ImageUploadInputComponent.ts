import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {FormInput} from './FormInput';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {StorageItem} from '../../@models/results/StorageItem';
import {RestClient} from '../HttpClient';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faBan, faEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'image-upload-input',
  templateUrl: './ImageUploadInputComponent.html'
})
export class ImageUploadInputComponent extends FormInput {
  @Input() public UploadUrl: string;
  protected hasImage: boolean = false;
  protected imageUrl: string = null;

  public constructor(cd: ChangeDetectorRef, private http: RestClient) {
    super(cd);
    library.add(faEdit);
    library.add(faBan);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.Control.value) {
      this.hasImage = true;
      this.imageUrl = this.Control.value.PublicUri;
    }
  }

  showInput() {
    this.hasImage = false;
  }

  hideInput() {
    if (this.imageUrl) {
      this.hasImage = true;
    }
  }

  onValueChange($event) {
    if ($event.target.files && $event.target.files.length) {
      const [file] = $event.target.files;

      this.http.post('developers/upload/', file, {name: file.name}).pipe(map(data => plainToClass(StorageItem, data as StorageItem))).subscribe(
        data => {
          this.Control.patchValue(data);
          this.hasImage = true;
          this.imageUrl = data.PublicUri;
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
