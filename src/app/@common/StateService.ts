import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StateService {
    protected titleState$ = new BehaviorSubject<string>('BRC Games');
    protected sidebarState$ = new BehaviorSubject<boolean>(true);

    onTitleChange(): Observable<string> {
        return this.titleState$.asObservable();
    }

    onSidebarStateChange(): Observable<boolean> {
        return this.sidebarState$.asObservable();
    }

    public setTitle(title: string): void {
        this.titleState$.next(title);
        document.title = title + ' - BRC Games';
    }

    public hideToolbar(): void {
        this.sidebarState$.next(false);
    }

    public showToolbar(): void {
        this.sidebarState$.next(true);
    }
}
