import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormLayoutContentComponent } from '@common/forms/FormLayoutContentComponent';
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
import { KeysPipe } from './KeysPipe';
import { FormLayoutComponent } from './FormLayoutComponent';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

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
        FormLayoutContentComponent,
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
        FormLayoutContentComponent,
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
