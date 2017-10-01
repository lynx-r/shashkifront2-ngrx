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
} from '@angular/material';

const COMPONENTS = [
  MdButtonModule,
  MdMenuModule,
  MdToolbarModule,
  MdIconModule,
  MdCardModule,
  MdGridListModule,
  MdSidenavModule,
  MdInputModule,
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})
export class MaterialModule {}
