import {NgModule} from '@angular/core';
import {ErrorsListComponent} from './ErrorsListComponent';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from 'ng2-ckeditor';
import {CKEFormFieldControlComponent, CKEInputComponent} from './fields/CKEInputComponent';
import {UploadInputComponent} from './fields/UploadInputComponent';
import {FormLayoutComponent} from './FormLayoutComponent';
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
import {TextInputComponent} from './fields/TextInputComponent';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TextAreaInputComponent} from './fields/TextAreaInputComponent';
import {CheckboxInputComponent} from './fields/CheckboxInputComponent';
import {SelectInputComponent} from './fields/SelectInputComponent';
import {ChipsInputComponent} from './fields/ChipsInputComponent';
import {InputFileConfig, InputFileModule} from 'ngx-input-file';
import {AutocompleteInputComponent} from './fields/AutocompleteInputComponent';
import {DatePickerInputComponent} from './fields/DatePickerInputComponent';

const config: InputFileConfig = {};

@NgModule({
    declarations: [
        ErrorsListComponent,
        TextInputComponent,
        TextAreaInputComponent,
        CKEInputComponent,
        UploadInputComponent,
        CheckboxInputComponent,
        SelectInputComponent,
        FormLayoutComponent,
        ChipsInputComponent,
        CKEFormFieldControlComponent,
        AutocompleteInputComponent,
        DatePickerInputComponent
    ],
    exports: [
        ErrorsListComponent,
        TextInputComponent,
        TextAreaInputComponent,
        SelectInputComponent,
        CKEInputComponent,
        UploadInputComponent,
        CheckboxInputComponent,
        FormLayoutComponent,
        ChipsInputComponent,
        AutocompleteInputComponent,
        DatePickerInputComponent
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
    ]
})
export class BioFormsModule {

}
