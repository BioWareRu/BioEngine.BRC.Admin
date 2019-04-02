import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
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
import { RouterModule } from '@angular/router';
import 'moment/locale/ru';
import { TrackByPropertyPipe } from '@common/pipes/TrackByPropertyPipe';
import { MomentModule } from 'ngx-moment';
import { DynamicHostDirective } from './directives/DynamicHostDirective';
import { BioFormsModule } from './forms/FormsModule';
import { ListTableComponent } from './list/component/list.component';
import { SectionsLabelsListComponent } from './list/component/sections-list.component';
import { SitesLabelsListComponent } from './list/component/sites-list.component';
import { TagsLabelsListComponent } from './list/component/tags-list.component';
import { ConfirmationDialogComponent } from './modals/ConfirmationDialogService';
import { SafePipe } from './pipes/SafePipe';
import { TruncatePipe } from './pipes/TruncatePipe';
import { BrcPerfectScrollbarDirective } from './scroll/scrollbar.component';
import { BioSharedModule } from './shared/BioSharedModule';
import { NotificationComponent } from './snacks/NotificationComponent';
import { CreateFolderDialogComponent, FileSizePipe, StorageManagerComponent } from './storage/StorageManagerComponent';
import { StorageManagerDialogComponent } from './storage/StorageManagerDialogComponent';
import { UserComponent } from './user/user.component';

@NgModule({
    declarations: [
        ListTableComponent,
        SitesLabelsListComponent,
        TagsLabelsListComponent,
        SectionsLabelsListComponent,
        BrcPerfectScrollbarDirective,
        UserComponent,
        NotificationComponent,
        ConfirmationDialogComponent,
        StorageManagerComponent,
        CreateFolderDialogComponent,
        FileSizePipe,
        SafePipe,
        TruncatePipe,
        TrackByPropertyPipe,
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
        SafePipe,
        TruncatePipe,
        TrackByPropertyPipe,
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
