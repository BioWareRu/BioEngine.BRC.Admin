import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractEntity, ListProvider, ListTableColumn, ListTableColumnType } from 'bioengine.core.api.client';
import { StateService } from '../../StateService';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'ngx-list-table',
    templateUrl: './ListTableComponent.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
        .loading-shade {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 56px;
            right: 0;
            background: rgba(0, 0, 0, 0.15);
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        mat-cell.actions {
            display: flex !important;
            justify-content: flex-end !important;

        }

        ::ng-deep .mat-cell.actions {
            display: flex !important;
            justify-content: flex-end !important;
        }

        .addButton {
            position: absolute;
            bottom: 56px;
            right: 56px;
        }
    `]
})
export class ListTableComponent<T extends AbstractEntity> implements OnInit {
    @Input() public provider: ListProvider<T>;
    @Input() public columns: Array<ListTableColumn<T>>;
    @Input() public addUrl = '';
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sorter: MatSort;
    public title: string;

    public columnsToDisplay: Array<string> = [];
    public columnTypes = ListTableColumnType;

    constructor(stateService: StateService) {
        stateService.onTitleChange().subscribe(title => this.title = title);
    }

    ngOnInit(): void {
        this.provider.columns = this.columns;
        this.provider.paginator = this.paginator;
        this.provider.sorter = this.sorter;
        this.columns.forEach(column => {
            if (!column.hidden) {
                this.columnsToDisplay.push(column.key);
            }
        });
        this.provider.init();
    }
}
