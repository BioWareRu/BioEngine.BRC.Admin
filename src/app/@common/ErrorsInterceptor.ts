import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
    private readonly _terminateErrorCodes = [400, 403, 404, 500, 502, 504];
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(tap(() => {
        }, error => {
            return this._processError(error);
        }));
    }
    private _processError(response: any): Observable<any> {
        // this._appState.notifyDataChanged('loading', false);
        /*if (response.status === 401) {
      const authService = this._inj.get(AuthService);
      authService.relogin();
    }*/
        if (this._terminateErrorCodes.indexOf(response.status) > -1) {
            if (response.error) {
                // const error = response.error;
                // this._appState.notifyDataChanged('httpError', new RestError(error.code, error.errors[0].message));
            }
            else {
                // this._appState.notifyDataChanged('httpError', new RestError(response.status, response.message));
            }
        }
        return new Observable();
    }
}
