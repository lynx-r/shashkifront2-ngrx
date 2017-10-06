import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { AboutComponent } from './containers/about.component';
import { ComponentsModule } from './components/index';
import { LightboxModule } from 'angular2-lightbox';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild([
      {
        path: '',
        component: AboutComponent,
      },
    ]),
    LightboxModule,
  ],
  declarations: [AboutComponent],
  providers: [],
})
export class AboutModule {}
