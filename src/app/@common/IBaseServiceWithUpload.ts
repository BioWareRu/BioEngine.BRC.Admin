import { StorageItem } from '@models/results/StorageItem';
import { Observable } from 'rxjs';
export interface IBaseServiceWithUpload {
    upload(file: File): Observable<StorageItem>;
}
