import {NgModule} from '@angular/core';
import {ErrorsListComponent} from './ErrorsListComponent';
import {TextInputComponent} from './TextInputComponent';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from 'ng2-ckeditor';
import {DropDownInputComponent} from './DropDownInputComponent';
import {CKEInputComponent} from './CKEInputComponent';
import {TextAreaInputComponent} from "./TextAreaInputComponent";
import {TagInputModule} from "ngx-chips";
import {ChipsInputComponent} from "./ChipsInputComponent";
import {ImageUploadInputComponent} from "./ImageUploadInputComponent";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ImagesUploadInputComponent} from "./ImagesUploadInputComponent";
import {FileDropModule} from "ngx-file-drop";

@NgModule({
  declarations: [
    ErrorsListComponent,
    TextInputComponent,
    TextAreaInputComponent,
    DropDownInputComponent,
    ChipsInputComponent,
    CKEInputComponent,
    ImageUploadInputComponent,
    ImagesUploadInputComponent,
  ],
  exports: [
    ErrorsListComponent,
    TextInputComponent,
    TextAreaInputComponent,
    DropDownInputComponent,
    ChipsInputComponent,
    CKEInputComponent,
    ImageUploadInputComponent,
    ImagesUploadInputComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    FontAwesomeModule,
    FileDropModule
  ]
})
export class BioFormsModule {

}
