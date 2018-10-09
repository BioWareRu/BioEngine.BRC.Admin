import {NgModule} from '@angular/core';
import {ErrorsListComponent} from './ErrorsListComponent';
import {TextInputComponent} from './TextInputComponent';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from 'ng2-ckeditor';
import {DropDownInputComponent} from './DropDownInputComponent';
import {CKEInputComponent} from './CKEInputComponent';
import {TextAreaInputComponent} from './TextAreaInputComponent';
import {TagsInputComponent} from './TagsInputComponent';
import {ImageUploadInputComponent} from './ImageUploadInputComponent';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {UploadInputComponent} from './UploadInputComponent';
import {FormLayoutComponent} from './FormLayoutComponent';
import {FileDropModule} from 'ngx-file-drop';
import {NgSelectModule} from '@ng-select/ng-select';
import {ThemeModule} from '../../@theme/theme.module';

@NgModule({
  declarations: [
    ErrorsListComponent,
    TextInputComponent,
    TextAreaInputComponent,
    DropDownInputComponent,
    TagsInputComponent,
    CKEInputComponent,
    ImageUploadInputComponent,
    UploadInputComponent,
    FormLayoutComponent
  ],
  exports: [
    ErrorsListComponent,
    TextInputComponent,
    TextAreaInputComponent,
    DropDownInputComponent,
    TagsInputComponent,
    CKEInputComponent,
    ImageUploadInputComponent,
    UploadInputComponent,
    FormLayoutComponent
  ],
  providers: [],
  imports: [
    ThemeModule,
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    CKEditorModule,
    FontAwesomeModule,
    FileDropModule
  ]
})
export class BioFormsModule {

}
