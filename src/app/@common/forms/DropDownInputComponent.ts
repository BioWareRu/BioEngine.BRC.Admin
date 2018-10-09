import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormInput} from './FormInput';
import {Observable} from 'rxjs/Observable';
import {ListResult} from '../list/ListResult';
import {map} from 'rxjs/operators';

@Component({
  selector: 'drop-down-input',
  templateUrl: './DropDownInputComponent.html'
})
export class DropDownInputComponent extends FormInput implements OnInit {
  @Input() public Options: Observable<ListResult<any>>;
  @Input() public ValueField: string = 'Id';
  @Input() public DisplayField: string = 'Title';
  @Input() public GroupByField: string = null;

  public constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  items$: Observable<any[]>;

  ngOnInit() {
    super.ngOnInit();
    if (this.Options) {
      this.items$ = this.Options.pipe(
        map(res => {
          return res.Data;
        }));
    }
  }
}
