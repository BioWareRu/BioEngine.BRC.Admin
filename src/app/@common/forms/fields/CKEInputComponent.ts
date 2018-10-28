import {Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormInput} from './FormInput';
import './CKEInputComponent.loader';
import 'ckeditor';
import {OAuthService} from 'angular-oauth2-oidc';
import {MatFormFieldControl} from '@angular/material';
import {FormBuilder, FormGroup, NgControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {FocusMonitor} from '@angular/cdk/a11y';

@Component({
    selector: 'cke-input',
    templateUrl: './CKEInputComponent.html',
})
export class CKEInputComponent extends FormInput {
    public config = {
        height: '300',
        extraAllowedContent: true,
        extraPlugins: 'divarea',
        customConfig: '',
        toolbar: [
            {name: 'clipboard', items: ['Undo', 'Redo']},
            {name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat', 'CopyFormatting']},
            {name: 'align', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']},
            {name: 'insert', items: ['Image', 'Iframe', 'Table']},
            {name: 'links', items: ['Link', 'Unlink']},
            {name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote']},
            {name: 'styles', items: ['Format', 'Font', 'FontSize']},
            {name: 'colors', items: ['TextColor', 'BGColor']},
            {name: 'tools', items: ['Maximize', 'Source']},
        ],
        filebrowserBrowseUrl: '',
        filebrowserWindowWidth: '1000',
        filebrowserWindowHeight: '700'
    };

    public constructor(private oauthService: OAuthService) {
        super();
        this.config.filebrowserBrowseUrl = '/ckfinder/ckfinder.html?token=' + this.oauthService.getAccessToken();
    }
}

export class CKEFormFieldControlValue {
    constructor(public  Text: string) {

    }
}

// noinspection TsLint
@Component({
    selector: 'mat-ckeditor',
    template: `
        <div [formGroup]="formGroup">
            <ckeditor [formControlName]="fieldName" #myckeditor [config]="ckeConfig"
                      debounce="500"></ckeditor>
        </div>
    `,
    providers: [{provide: MatFormFieldControl, useExisting: CKEFormFieldControlComponent}]
})
export class CKEFormFieldControlComponent implements MatFormFieldControl<CKEFormFieldControlValue>, OnInit, OnDestroy {
    static nextId = 0;

    stateChanges = new Subject<void>();
    focused = false;
    errorState = false;

    @Input() formGroup: FormGroup;
    @Input() fieldName: string;
    @Input() ckeConfig: any;
    @ViewChild('ckeditor') ckeditor: any;

    @HostBinding('attr.id')
    id = `mat-ckeditor-${CKEFormFieldControlComponent.nextId++}`;

    @HostBinding('attr.aria-describedby')
    describedBy = '';
    readonly autofilled: boolean;
    readonly controlType: string;
    readonly ngControl: NgControl | null;

    constructor(fb: FormBuilder, private fm: FocusMonitor, private elRef: ElementRef) {
        fm.monitor(elRef.nativeElement, true).subscribe((origin) => {
            this.focused = !!origin;
            this.stateChanges.next();
        });
    }

    get empty(): boolean {
        if (!this.formGroup) {
            return true;
        }
        const n = this.formGroup.get(this.fieldName);
        return !n.value;
    }

    @HostBinding('class.floating')
    get shouldLabelFloat(): boolean {
        return true;
    }

    private _placeholder: string;

    @Input()
    get placeholder(): string {
        return this._placeholder;
    }

    set placeholder(plh) {
        this._placeholder = plh;
        this.stateChanges.next();
    }

    private _required = false;

    @Input()
    get required(): boolean {
        return this._required;
    }

    set required(req) {
        this._required = coerceBooleanProperty(req);
        this.stateChanges.next();
    }

    private _disabled = false;

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(dis) {
        this._disabled = coerceBooleanProperty(dis);
        this.stateChanges.next();
    }

    @Input()
    get value(): CKEFormFieldControlValue | null {
        if (this.formGroup) {
            const n: CKEFormFieldControlValue = this.formGroup.get(this.fieldName).value;
            if (n.Text.length > 0) {
                return new CKEFormFieldControlValue(n.Text);
            }
        }
        return null;
    }

    set value(value: CKEFormFieldControlValue | null) {
        value = value || new CKEFormFieldControlValue('');
        this.formGroup.get(this.fieldName).setValue(value);
        this.errorState = !this.formGroup.get(this.fieldName).valid;
        this.stateChanges.next();
    }

    ngOnInit(): void {
        this.formGroup.get(this.fieldName).valueChanges.subscribe(() => {
            this.errorState = !this.formGroup.get(this.fieldName).valid;
            this.stateChanges.next();
        });
    }

    ngOnDestroy(): void {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef.nativeElement);
    }

    setDescribedByIds(ids: string[]): void {
        this.describedBy = ids.join(' ');
    }

    onContainerClick(event: MouseEvent): void {
        if ((event.target as Element).tagName.toLowerCase() !== 'textarea') {
            this.elRef.nativeElement.querySelector('textarea').focus();
        }
    }
}
