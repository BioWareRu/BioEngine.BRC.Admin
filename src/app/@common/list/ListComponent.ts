import { BaseService } from '../BaseService';
import { OnInit } from '@angular/core';
import { ListProvider } from './ListProvider';
import { Model } from '../../@models/base/Model';
import { ListTableColumn } from './ListTableColumn';
import { PageComponent, PageContext } from '../PageComponent';

export abstract class ListComponent<T extends Model> extends PageComponent
    implements OnInit {
    public provider: ListProvider<T>;
    public addUrl = '';
    public columns: ListTableColumn<T>[] = [];
    public isInitalized = false;

    protected constructor(
        context: PageContext,
        private service: BaseService<T>
    ) {
        super(context);
        this.provider = new ListProvider<T>(
            this.service,
            this.Router,
            this.Route
        );
    }

    ngOnInit(): void {
        this.Init();
    }

    public deleteItem(model: T): void {
        this.DialogService.confirm(
            `Удаление записи "${model.Title}"`,
            `Вы точно хотите удалить запись "${model.Title}"?`
        ).onConfirm.subscribe(() => {
            this.provider.dataLoaded = false;
            this.service.delete(model.Id).subscribe((res: boolean) => {
                if (res) {
                    this.provider.load();
                }
            });
        });
    }

    protected abstract GetColumns(): ListTableColumn<T>[];

    protected Init(): void {
        this.columns = this.GetColumns();
        this.isInitalized = true;
    }
}
