import { NgModule } from '@angular/core';

import {
  MdButtonModule,
  MdMenuModule,
  MdToolbarModule,
  MdIconModule,
  MdCardModule,
  MdGridListModule,
  MdSidenavModule,
  MdInputModule,
  MdButtonToggleModule,
  MdOptionModule,
  MdCheckboxModule,
  MdDialogModule,
  MdSelectModule,
  MdListModule,
  MdTabsModule,
  MdDatepickerModule,
  MdNativeDateModule,
  DateAdapter,
  MD_DATE_FORMATS,
} from '@angular/material';
import { MyDateAdapter } from './my-date-adapter';
import { AppConstants } from './core/services/app-constants';

const COMPONENTS = [
  MdButtonModule,
  MdButtonToggleModule,
  MdMenuModule,
  MdToolbarModule,
  MdIconModule,
  MdCardModule,
  MdGridListModule,
  MdSidenavModule,
  MdInputModule,
  MdOptionModule,
  MdCheckboxModule,
  MdDialogModule,
  MdSelectModule,
  MdListModule,
  MdTabsModule,
  MdDatepickerModule,
  MdNativeDateModule,
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
  providers: [
    // {provide: DateAdapter, useClass: MomentDateAdapter},
    // {provide: MD_DATE_FORMATS, useValue: AppConstants.MY_DATE_FORMATS},
  ],
})
export class MaterialModule {}
