import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENV } from '../../environments/environment';
import { User } from '@models/User';

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
