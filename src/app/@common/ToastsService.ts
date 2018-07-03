import {Injectable} from "@angular/core";
import {ToasterService, Toast, BodyOutputType} from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

@Injectable()
export class ToastsService {

  constructor(private toasterService: ToasterService) {
  }

  public error(title: string, error: string) {
    const toast: Toast = {
      type: 'error',
      title: title,
      body: error,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
      timeout: 0
    };
    this.toasterService.popAsync(toast);
  }

  public warning(title: string, warning: string) {
    const toast: Toast = {
      type: 'warning',
      title: title,
      body: warning,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
      timeout: 5000
    };
    this.toasterService.popAsync(toast);
  }

  public success(title: string, success: string) {
    const toast: Toast = {
      type: 'success',
      title: title,
      body: success,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
      timeout: 5000
    };
    this.toasterService.popAsync(toast);
  }
}
