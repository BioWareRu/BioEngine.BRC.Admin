import {Component, Input} from '@angular/core';
import {User} from '../../@models/User';

@Component({
    template: `
        <ng-container *ngIf="user">
            <div class="avatar" [ngStyle]="{'background-image': 'url(' + user.PhotoUrl + ')'}"></div>
            <div class="name"><a [ngStyle]="{'color':'#'+color}" target="_blank"
                                 [href]="user.ProfileUrl">{{user.Name}}</a></div>
        </ng-container>
    `,
    styles: [`
        :host {
            display: flex;
        }

        .name {
            align-self: center;
        }

        .name a {
            text-decoration: none;
        }

        .avatar {
            height: 33px;
            width: 33px;
            border-radius: 50%;
            flex-shrink: 0;
            object-fit: cover;
            background-color: white;
            background-size: cover;
            margin-right: 5px;
        }
    `],
    selector: 'brc-user'
})
export class UserComponent {
    @Input() public user: User;
    @Input() public color: string;
}
