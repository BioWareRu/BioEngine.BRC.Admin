import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'bioengine.core.api.client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENV } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private readonly _httpClient: HttpClient) {
    }

    getUser(): Observable<User> {
        return this._httpClient.get(ENV.apiUrl + 'me').pipe(map(data => <User>data));
    }
}
