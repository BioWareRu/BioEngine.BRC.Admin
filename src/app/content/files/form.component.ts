import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {PageContext} from '../../@common/PageComponent';
import {ContentFormComponent} from '../../@common/forms/FormComponent';
import {File} from '../../@models/File';
import {SaveFileResponse} from '../../@models/results/File';
import {ServicesProvider} from '../../@services/ServicesProvider';
import {BaseService} from '../../@common/BaseService';

@Component({
  moduleId: module.id,
  selector: 'fileForm',
  templateUrl: './form.component.html',
  providers: [
    PageContext
  ]
})
export class FilesFormComponent extends ContentFormComponent<File, SaveFileResponse> implements OnInit {
  constructor(context: PageContext, protected servicesProvider: ServicesProvider) {
    super(context, servicesProvider);
  }

  protected constructorDataFrom() {
    this.registerFormControl('Text', [<any>Validators.required], 'Data.Text');
    this.registerFormControl('File', [<any>Validators.required], 'Data.File');
  }

  protected getNewModelTitle(): string {
    return 'Создание файла';
  }

  protected getRoute(): string {
    return '/content/files';
  }

  protected getService(): BaseService<File> {
    return this.servicesProvider.FilesService;
  }
}
