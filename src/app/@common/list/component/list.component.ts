import {Component, Input} from '@angular/core';
import {Model} from '../../../@models/base/Model';
import {ListProvider} from '../ListProvider';

@Component({
  selector: 'ngx-list-table',
  templateUrl: './list.component.html',
})
export class ListTableComponent<T extends Model = Model> {
  @Input() public provider: ListProvider<T>;
  @Input() public cardTitle = '';
  @Input() public cardIcon = '';
}
