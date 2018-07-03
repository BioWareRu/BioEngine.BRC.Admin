import {Component, Input} from '@angular/core';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faFileAlt} from '@fortawesome/free-solid-svg-icons';
import {faImages} from '@fortawesome/free-solid-svg-icons';
import {faFileArchive} from '@fortawesome/free-solid-svg-icons';
import {faGlobe} from '@fortawesome/free-solid-svg-icons';
import {faUsers} from '@fortawesome/free-solid-svg-icons';
import {faGamepad} from '@fortawesome/free-solid-svg-icons';
import {faFolder} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card>
      <div class="icon-container">
        <div class="icon primary">
          <fa-icon [icon]="icon"></fa-icon>
        </div>
      </div>

      <div class="details">
        <div class="title">{{ title }}</div>
        <ng-content></ng-content>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {
  @Input() title: string;
  @Input() icon: string;

  constructor() {
    library.add(faFileAlt);
    library.add(faImages);
    library.add(faFileArchive);
    library.add(faGlobe);
    library.add(faUsers);
    library.add(faGamepad);
    library.add(faFolder);
  }
}
