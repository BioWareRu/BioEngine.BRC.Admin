import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {environment} from '../../environments/environment';
import {User} from '../@models/User';


@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private httpClient: HttpClient) {
    }

    getUser(): Observable<User> {
        return this.httpClient.get(environment.apiUrl + 'me').pipe(map(data => plainToClass(User, data as User)));
    }
}
