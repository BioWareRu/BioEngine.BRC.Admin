import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormInput} from './FormInput';
import {TagsService} from '../../@services/TagsService';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {ListResult} from '../list/ListResult';

@Component({
  selector: 'tags-input',
  templateUrl: './TagsInputComponent.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TagsInputComponent extends FormInput implements OnInit {
  @Input() public Options: Observable<ListResult<any>>;
  @Input() public AllowAdd: boolean = false;
  @Input() public ValueField: string = 'Id';
  @Input() public DisplayField: string = 'Title';

  items$: Observable<any[]>;
  public addTagPromise = (name: string): Promise<any> => {
    return new Promise((resolve) => {
      this.tagsService.create(name).subscribe(result => {
        resolve(result.Model);
      });
    });
  }

  public constructor(cd: ChangeDetectorRef, private tagsService: TagsService) {
    super(cd);
  }

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
