import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class StateService {
    protected titleState$ = new BehaviorSubject<string>('BRC Games');


    onTitleChange(): Observable<string> {
        return this.titleState$.asObservable();
    }

    public setTitle(title: string): void {
        this.titleState$.next(title);
        document.title = title + ' - BRC Games';
    }
}
