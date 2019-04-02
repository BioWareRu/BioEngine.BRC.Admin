import { OnInit } from '@angular/core';
import { AbstractModel } from '@models/base/abstract-model';
import { AbstractBaseService } from '../abstract-base-service';
import { AbstractPageComponent, PageContext } from '../abstract-page-component';
import { ListProvider } from './ListProvider';
import { ListTableColumn } from './ListTableColumn';

export abstract class AbstractListComponent<T extends AbstractModel> extends AbstractPageComponent
    implements OnInit {
    public provider: ListProvider<T>;
    public addUrl = '';
    public columns: Array<ListTableColumn<T>> = [];
    public isInitialized = false;

    protected constructor(
        private readonly _service: AbstractBaseService<T>,
        context: PageContext
    ) {
        super(context);
        this.provider = new ListProvider<T>(
            this._service,
            this._router,
            this._route
        );
    }

    ngOnInit(): void {
        this._init();
    }

    public deleteItem(model: T): void {
        this._dialogService.confirm(
            `Удаление записи "${model.title}"`,
            `Вы точно хотите удалить запись "${model.title}"?`
        ).onConfirm.subscribe(() => {
            this.provider.dataLoaded = false;
            this._service.delete(model.id).subscribe((res: boolean) => {
                if (res) {
                    this.provider.load();
                }
            });
        });
    }

    protected abstract _getColumns(): Array<ListTableColumn<T>>;

    protected _init(): void {
        this.columns = this._getColumns();
        this.isInitialized = true;
    }
}
