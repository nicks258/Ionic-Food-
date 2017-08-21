import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VersionPage } from './version';

@NgModule({
  declarations: [
    VersionPage,
  ],
  imports: [
    IonicPageModule.forChild(VersionPage),
  ],
  exports: [
    VersionPage
  ]
})
export class VersionPageModule {}
