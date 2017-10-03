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
} from '@angular/material';

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
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})
export class MaterialModule {}
