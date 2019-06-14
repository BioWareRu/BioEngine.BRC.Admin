import { OnInit } from '@angular/core';
import { AbstractEntity } from '@models/base/AbstractEntity';
import { AbstractBaseService } from '../AbstractBaseService';
import { AbstractPageComponent } from '../AbstractPageComponent';
import { PageContext } from '../PageContext';
import { ListProvider } from './ListProvider';
import { ListTableColumn } from './ListTableColumn';

export abstract class AbstractListComponent<T extends AbstractEntity> extends AbstractPageComponent
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
