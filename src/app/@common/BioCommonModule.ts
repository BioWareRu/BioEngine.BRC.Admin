import { NgModule } from '@angular/core';
import { ListTableComponent } from './list/component/list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'ngx-moment';
import 'moment/locale/ru';
import { BioFormsModule } from './forms/FormsModule';
import {
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule
} from '@angular/material';
import { BrcPerfectScrollbarDirective } from './scroll/scrollbar.component';
import { UserComponent } from './user/user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotificationComponent } from './snacks/NotificationComponent';
import { ConfirmationDialogComponent } from './modals/ConfirmationDialogService';
import {
    StorageManagerComponent,
    CreateFolderDialogComponent,
    FileSizePipe
} from './storage/StorageManagerComponent';
import { FormsModule } from '@angular/forms';
import { DynamicHostDirective } from './directives/DynamicHostDirective';
import { StorageManagerDialogComponent } from './storage/StorageManagerDialogComponent';
import { BioSharedModule } from './shared/BioSharedModule';

@NgModule({
    declarations: [
        ListTableComponent,
        BrcPerfectScrollbarDirective,
        UserComponent,
        NotificationComponent,
        ConfirmationDialogComponent,
        StorageManagerComponent,
        CreateFolderDialogComponent,
        FileSizePipe,
        DynamicHostDirective,
        StorageManagerDialogComponent
    ],
    exports: [
        CommonModule,
        RouterModule,
        MomentModule,
        BioFormsModule,
        MatIconModule,
        MatGridListModule,
        MatMenuModule,
        MatCardModule,
        ListTableComponent,
        BrcPerfectScrollbarDirective,
        UserComponent,
        FlexLayoutModule,
        MatButtonModule,
        MatDialogModule,
        StorageManagerComponent,
        FileSizePipe,
        DynamicHostDirective,
        BioSharedModule
    ],
    providers: [],
    imports: [
        MatProgressSpinnerModule,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        MatPaginatorModule,
        MatButtonModule,
        MatChipsModule,
        MatCardModule,
        MatSnackBarModule,
        MomentModule,
        RouterModule,
        MatSortModule,
        CommonModule,
        FlexLayoutModule,
        MatDialogModule,
        FormsModule,
        BioSharedModule
    ],
    entryComponents: [
        NotificationComponent,
        ConfirmationDialogComponent,
        CreateFolderDialogComponent,
        StorageManagerDialogComponent
    ]
})
export class BioCommonModule {}
