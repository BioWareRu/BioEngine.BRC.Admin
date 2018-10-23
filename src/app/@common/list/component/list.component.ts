import {Component, Input} from '@angular/core';
import {Model} from '../../../@models/base/Model';
import {ListProvider} from '../ListProvider';
import {StateService} from '../../../@core/data/state.service';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faGlobe, faPlus, faSort, faSortAmountDown, faSortAmountUp, faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ngx-list-table',
  templateUrl: './list.component.html',
})
export class ListTableComponent<T extends Model = Model> {
  @Input() public provider: ListProvider<T>;
  @Input() public addUrl = '';

  public Title: string;

  constructor(stateService: StateService) {
    stateService.onTitleChange().subscribe(title => this.Title = title);
    library.add(faSort);
    library.add(faSortAmountUp);
    library.add(faSortAmountDown);
    library.add(faGlobe);
    library.add(faTrash);
    library.add(faPlus);
  }
}
