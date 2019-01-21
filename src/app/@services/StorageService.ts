import { RestClient } from 'app/@common/HttpClient';
import { Injectable } from '@angular/core';
import { StorageItem } from 'app/@models/results/StorageItem';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    public constructor(protected httpClient: RestClient) {}

    public get(path: string): Observable<StorageNode[]> {
        return this.httpClient
            .get('Storage', {
                path: path
            })
            .pipe(map(res => res as StorageNode[]));
    }

    public upload(file: File, prefix: string): Observable<StorageNode> {
        return this.httpClient
            .post('Storage/upload/', file, { name: file.name, path: prefix })
            .pipe(map(data => plainToClass(StorageNode, data as StorageNode)));
    }
}

export class StorageNode {
    public Name: string;
    public Path: string;
    public IsDirectory: boolean;
    public Item: StorageItem;
    public Items: StorageNode[];
}
