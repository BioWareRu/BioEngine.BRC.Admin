import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTabsModule
} from '@angular/material';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { BioSharedModule } from './../shared/BioSharedModule';
import { ErrorsListComponent } from './ErrorsListComponent';
import { AutocompleteInputComponent } from './fields/AutocompleteInputComponent';
import { CheckboxInputComponent } from './fields/CheckboxInputComponent';
import { ChipsInputComponent } from './fields/ChipsInputComponent';
import { DatePickerInputComponent } from './fields/DatePickerInputComponent';
import { SelectInputComponent } from './fields/SelectInputComponent';
import { TextAreaInputComponent } from './fields/TextAreaInputComponent';
import { TextInputComponent } from './fields/TextInputComponent';
import { UploadInputComponent } from './fields/UploadInputComponent';
import { KeysPipe } from './abstract-form-component';
import { FormLayoutComponent } from './FormLayoutComponent';

const config: InputFileConfig = {};

@NgModule({
    declarations: [
        ErrorsListComponent,
        TextInputComponent,
        TextAreaInputComponent,
        UploadInputComponent,
        CheckboxInputComponent,
        SelectInputComponent,
        FormLayoutComponent,
        ChipsInputComponent,
        AutocompleteInputComponent,
        DatePickerInputComponent,
        KeysPipe
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        ErrorsListComponent,
        TextInputComponent,
        TextAreaInputComponent,
        SelectInputComponent,
        UploadInputComponent,
        CheckboxInputComponent,
        FormLayoutComponent,
        ChipsInputComponent,
        AutocompleteInputComponent,
        DatePickerInputComponent,
        CKEditorModule,
        KeysPipe
    ],
    providers: [],
    imports: [
        CommonModule,
        FormsModule,
        // NgSelectModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatSelectModule,
        MatChipsModule,
        FlexLayoutModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        CKEditorModule,
        MatIconModule,

        MatTabsModule,
        MatButtonModule,
        InputFileModule.forRoot(config),
        BioSharedModule
    ]
})
export class BioFormsModule { }
