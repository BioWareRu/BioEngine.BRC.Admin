import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StateService {
    protected _titleState$ = new BehaviorSubject<string>('BRC Games');
    protected _sidebarState$ = new BehaviorSubject<boolean>(true);

    onTitleChange(): Observable<string> {
        return this._titleState$.asObservable();
    }

    onSidebarStateChange(): Observable<boolean> {
        return this._sidebarState$.asObservable();
    }

    public setTitle(title: string): void {
        this._titleState$.next(title);
        document.title = title + ' - BRC Games';
    }

    public hideToolbar(): void {
        this._sidebarState$.next(false);
    }

    public showToolbar(): void {
        this._sidebarState$.next(true);
    }
}
