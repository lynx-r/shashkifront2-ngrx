import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangelogComponent } from './changelog.component';
import { ChangelogListComponent } from './changelog-list.component';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

export const COMPONENTS = [ChangelogListComponent, ChangelogComponent];

@NgModule({
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
