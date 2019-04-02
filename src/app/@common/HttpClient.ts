import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { ENV } from '../../environments/environment';

@Injectable()
export class RestClient {
    private readonly _baseUrl: string = ENV.apiUrl;

    constructor(private readonly _httpClient: HttpClient) {
    }

    public static encodeQueryData(data): string {
        const ret: string[] = [];
        for (const d in data) {
            if (!data.hasOwnProperty(d)) {
                continue;
            }
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        }

        return ret.join('&');
    }

    public get(resource, params): Observable<any> {
        return this._httpClient.get(this._getUrl(resource, params));
    }

    public post(resource, data, params = {}): Observable<any> {
        return this._httpClient.post(this._getUrl(resource, params), data);
    }

    public put(resource, data): Observable<any> {
        return this._httpClient.put(this._getUrl(resource), data);
    }

    public delete(resource): Observable<any> {
        return this._httpClient.delete(this._getUrl(resource));
    }

    private _getUrl(resource: string, params?: object): string {
        let url = this._baseUrl + resource + '?';
        if (params) {
            url += RestClient.encodeQueryData(params);
        }

        return url;
    }
}

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
    private readonly _terminateErrorCodes = [400, 403, 404, 500, 502, 504];

    constructor(private readonly _inj: Injector /*, private _appState: AppState*/) {
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(
                () => {
                },
                error => {
                    return this._processError(error);
                }
            )
        );
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
            } else {
                // this._appState.notifyDataChanged('httpError', new RestError(response.status, response.message));
            }
        }

        return new Observable();
    }
}
