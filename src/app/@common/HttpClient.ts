import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
