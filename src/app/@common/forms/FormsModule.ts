import {NgModule} from '@angular/core';
import {ErrorsListComponent} from './ErrorsListComponent';
import {TextInputComponent} from './TextInputComponent';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from 'ng2-ckeditor';
import {DropDownInputComponent} from './DropDownInputComponent';
import {CKEInputComponent} from './CKEInputComponent';
import {TextAreaInputComponent} from "./TextAreaInputComponent";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TagInputModule} from "ngx-chips";
import {ChipsInputComponent} from "./ChipsInputComponent";
import {ImageUploadInputComponent} from "./ImageUploadInputComponent";
import {ImageUploadModule} from "angular2-image-upload";
import {AngularFontAwesomeModule} from "angular-font-awesome";

@NgModule({
  declarations: [
    ErrorsListComponent,
    TextInputComponent,
    TextAreaInputComponent,
    DropDownInputComponent,
    ChipsInputComponent,
    CKEInputComponent,
    ImageUploadInputComponent
  ],
  exports: [
    ErrorsListComponent,
    TextInputComponent,
    TextAreaInputComponent,
    DropDownInputComponent,
    ChipsInputComponent,
    CKEInputComponent,
    ImageUploadInputComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    AngularFontAwesomeModule,
    ImageUploadModule.forRoot()
  ]
})
export class BioFormsModule {

}
